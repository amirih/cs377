This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## PSQL:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install postgresql postgresql-contrib
psql
```

```sql
CREATE ROLE cs377_students WITH LOGIN PASSWORD 'cs377_students_password';
CREATE DATABASE demo;
CREATE DATABASE demo3;
GRANT ALL PRIVILEGES ON DATABASE demo TO cs377_students;
GRANT ALL PRIVILEGES ON DATABASE demo3 TO cs377_students;
\q
```

```bash
exit
```

17 is the current version of my psql, replace it with your own

```bash
nano /etc/postgresql/17/main/pg_hba.conf
```

add this to the end f the file:

```
host    all             all             0.0.0.0/0               md5
```

```bash
nano /etc/postgresql/17/main/postgresql.conf
```

```
listen_addresses = '*'
```

```bash
sudo systemctl restart postgresql  
```


```bash
psql -h 45.55.151.158 -U cs377_students -d demo
```

Password is: cs377-students-password


# Query Examples:

```sql
SELECT * FROM university.course;
```

```sql
SELECT * 
FROM university.course
WHERE cnum >300
;
```

```sql
SELECT * 
FROM university.course
WHERE name='Software Design'
;
```

```sql
SELECT * 
FROM university.course
WHERE dept='CSC'
;
```

