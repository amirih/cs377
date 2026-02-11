# University Database SQL Examples

Tables: - `course(cnum, name, dept, breadth)` -
`offering(oid, cnum, dept, term, instructor)` -
`student(sid, firstname, surname, campus, email, cgpa)` -
`took(sid, oid, grade)`

------------------------------------------------------------------------

## SELECT Queries

**List all CSC courses**

``` sql
SELECT * FROM university.course
WHERE dept = 'CSC';
```

**Students with CGPA \>= 3.5**

``` sql
SELECT sid, firstname, surname, cgpa
FROM university.student
WHERE cgpa >= 3.5
ORDER BY cgpa DESC;
```

**Offerings in term 20089**

``` sql
SELECT *
FROM university.offering
WHERE term = 20089;
```

**Average grade per offering**

``` sql
SELECT oid, AVG(grade) AS avg_grade
FROM university.took
GROUP BY oid;
```

------------------------------------------------------------------------

## INSERT Queries

**Add a course**

``` sql
INSERT INTO university.course (cnum, name, dept, breadth)
VALUES (999, 'Special Topics', 'CSC', false);
```

**Add a student**

``` sql
INSERT INTO university.student
VALUES (55555, 'Jane', 'Doe', 'StG', 'jane@cs', 3.7);
```

**Record course taken**

``` sql
INSERT INTO university.took (sid, oid, grade)
VALUES (55555, 1, 88);
```

------------------------------------------------------------------------

## UPDATE Queries

**Update student email**

``` sql
UPDATE university.student
SET email = 'newemail@cs'
WHERE sid = 98000;
```

**Fix a grade**

``` sql
UPDATE university.took
SET grade = 85
WHERE sid = 99132 AND oid = 1;
```

------------------------------------------------------------------------

## DELETE Queries

**Remove a course record for a student**

``` sql
DELETE FROM university.took
WHERE sid = 55555 AND oid = 1;
```

**Delete a student**

``` sql
DELETE FROM university.student
WHERE sid = 55555;
```

------------------------------------------------------------------------

## JOIN Queries

**Show students with grades**

``` sql
SELECT s.sid, s.firstname, s.surname, t.grade
FROM university.student s
JOIN university.took t ON s.sid = t.sid;
```

**Offerings with course names**

``` sql
SELECT o.oid, o.term, c.dept, c.cnum, c.name
FROM university.offering o
JOIN university.course c
  ON c.dept = o.dept AND c.cnum = o.cnum;
```

**Students who took CSC 343 with Horton**

``` sql
SELECT s.sid, s.firstname, s.surname, t.grade
FROM university.student s
JOIN university.took t     ON s.sid = t.sid
JOIN university.offering o ON t.oid = o.oid
WHERE o.dept = 'CSC'
  AND o.cnum = 343
  AND o.instructor = 'Horton';
```

------------------------------------------------------------------------

## Aggregation with JOIN

**Average grade per instructor**

``` sql
SELECT o.instructor, AVG(t.grade) AS avg_grade
FROM university.offering o
JOIN university.took t ON t.oid = o.oid
GROUP BY o.instructor;
```

------------------------------------------------------------------------

## Subquery Examples

**Students above average CGPA**

``` sql
SELECT *
FROM university.student
WHERE cgpa > (SELECT AVG(cgpa) FROM university.student);
```

**Students who took a class by Suzuki**

``` sql
SELECT DISTINCT s.sid, s.firstname, s.surname
FROM university.student s
WHERE s.sid IN (
  SELECT t.sid
  FROM university.took t
  JOIN university.offering o ON t.oid = o.oid
  WHERE o.instructor = 'Suzuki'
);
```
