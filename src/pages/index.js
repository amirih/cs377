import React, { useState, useEffect } from "react";
import queryString from "qs";
import { TabMenu } from "primereact/tabmenu";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Fieldset } from "primereact/fieldset";

export default function Home() {
  const [data, setData] = useState([]);
  const [database, setDatabase] = useState("demo");
  const [apiRoute, setApiRoute] = useState("data-demo");
  const [query, setQuery] = useState("SELECT * FROM university.course");
  const [submit, setSubmit] = useState(false);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");
  const [tables, setTables] = useState(["course", "student", "enroll"]);

  const items = [].map((item) => ({
    label: item,
  }));
  const databaseOptions = ["demo"].map((item) => ({
    name: item,
    value: item,
  }));

  async function fetchData() {
    const response = await fetch(
      "/api/" + apiRoute + "?" + queryString.stringify({ query })
    );
    const data = await response.json();

    //reconstruct columns from data:
    const columns = [];
    if (data?.data?.length > 0) {
      for (const key in data.data[0]) {
        columns.push({ field: key, header: key });
      }
      setColumns(columns);
      setError("");
      const tables = [];
      for (const key in data.tables) {
        tables.push(data.tables[key].tablename);
      }
      setTables(tables);
    }
    if (data.error) {
      setTables([]);
      setError(data.error);
      setData([]);
      setColumns([]);
      return;
    }

    setData(data.data);
  }
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [submit]);

  useEffect(() => {
    setData([]);
    if (database === "demo") {
      setApiRoute("data-demo");
    } else if (database === "demo2") {
      setApiRoute("data-demo2");
    }
  }, [database]);

  return (
    <div>
      <div className="p-4 md:p-6 lg:p-8">
        <div
          className="border-2 border-dashed surface-border border-round surface-card"
          style={{ minHeight: "20rem" }}
        >
          <div className="surface-section px-4 py-5 md:px-6 lg:px-8">
            <div className="flex lg:align-items-center flex-column lg:flex-row">
              <div className="text-3xl font-medium text-900 mr-0 lg:mr-4 mb-4 lg:mb-0">
                CS 377
              </div>
              <TabMenu
                model={items}
                activeitem={items[0]}
                className="flex-grow-1"
              />
            </div>
          </div>

          <div>
            <Dropdown
              value={database}
              onChange={(e) => setDatabase(e.value)}
              options={databaseOptions}
              optionLabel="name"
              placeholder="Select a Database"
              className="w-full md:w-14rem"
            />
            <Button label="Submit" onClick={() => setSubmit(!submit)} />
          </div>
          <div>
            <InputTextarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={20}
              cols={100}
            />
          </div>
          <Fieldset legend="Tables:">
            <div className="m-0">
              {tables.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          </Fieldset>
          <div>
            {data && (
              <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
                {columns.map((col) => (
                  <Column
                    key={col.field}
                    field={col.field}
                    header={col.header}
                  ></Column>
                ))}
              </DataTable>
            )}
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
