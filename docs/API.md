# Smart Leads API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

Include header on protected routes:

```
Authorization: Bearer <token>
```

### Register

`POST /auth/register`

```json
{
  "name": "Jane Sales",
  "email": "jane@example.com",
  "password": "password123"
}
```

Response `201`:

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { "id": "...", "name": "...", "email": "...", "role": "sales" },
    "token": "jwt..."
  }
}
```

### Login

`POST /auth/login`

```json
{
  "email": "admin@gigflow.com",
  "password": "Admin@123456"
}
```

### Get current user

`GET /auth/me` (protected)

---

## Leads

All lead routes require authentication.

### List leads (paginated + filters)

`GET /leads`

| Query | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default 1) |
| `status` | string | `New`, `Contacted`, `Qualified`, `Lost` |
| `source` | string | `Website`, `Instagram`, `Referral` |
| `search` | string | Name or email (case-insensitive) |
| `sort` | string | `latest` or `oldest` |

Example: `GET /leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1`

Response `200`:

```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": [/* lead objects */],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Get single lead

`GET /leads/:id`

### Create lead

`POST /leads`

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Instagram"
}
```

### Update lead

`PUT /leads/:id`

### Delete lead

`DELETE /leads/:id` — **Admin only**

### Export CSV

`GET /leads/export/csv`

Same query params as list (no pagination). Returns `text/csv` file download.

---

## Health

`GET /api/health`

---

## Error format

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Valid email is required"]
  }
}
```

## Status codes

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden (RBAC) |
| 404 | Not found |
| 409 | Conflict |
| 500 | Server error |
