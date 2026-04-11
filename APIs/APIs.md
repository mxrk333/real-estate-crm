# PSGC API Documentation

This document lists available endpoints for accessing Philippine Standard Geographic Code (PSGC) data.

---

## Provinces

**Endpoint:**

```

GET [https://psgc.cloud/api/provinces](https://psgc.cloud/api/provinces)

```

**Fields:**

- code
- name

**cURL Example:**

```bash
curl -s https://psgc.cloud/api/provinces
```

---

## Cities

**Endpoint:**

```
GET https://psgc.cloud/api/cities
```

**Fields:**

- code
- name
- type
- district
- zip_code

**cURL Example:**

```bash
curl -s https://psgc.cloud/api/cities
```

---

## Municipalities

**Endpoint:**

```
GET https://psgc.cloud/api/municipalities
```

**Fields:**

- code
- name
- type
- district
- zip_code

**cURL Example:**

```bash
curl -s https://psgc.cloud/api/municipalities
```

---

## Barangays

**Endpoint:**

```
GET https://psgc.cloud/api/barangays
```

**Fields:**

- code
- name
- status

**cURL Example:**

```bash
curl -s https://psgc.cloud/api/barangays
```
