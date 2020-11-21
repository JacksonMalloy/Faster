-- Schema

CREATE SCHEMA IF NOT EXISTS fm;

-- Sequences

CREATE SEQUENCE IF NOT EXISTS fm.admin_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.customer_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.tenant_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.menu_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.item_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.choice_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.selection_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.header_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.image_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.order_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.sms_id_seq;

-- Tables

CREATE TABLE "fm"."customers" (
    "customer_id" int4 NOT NULL DEFAULT nextval('fm.customer_id_seq'::regclass),
    "phone" varchar DEFAULT NULL,
    "email" varchar DEFAULT NULL,
    "name" varchar,

    -- Used as the 2 step verification for user access
    "pin" varchar,
    "table_id" varchar,
    "permissions" varchar NOT NULL DEFAULT 'CUSTOMER',
    "created_at" timestamptz NOT NULL DEFAULT now(),
    UNIQUE (phone),
    UNIQUE (email),
    PRIMARY KEY ("customer_id")
);

CREATE TABLE "fm"."tenants" (
    "tenant_id" int4 NOT NULL DEFAULT nextval('fm.tenant_id_seq'::regclass),
    "name" varchar,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "address" varchar,
    "sub_address" varchar,
    "city" varchar,
    "country_region" varchar,
    "province" varchar,
    "postal_code" varchar,
    "phone" varchar,
    "website_url" varchar,

    -- Used as the URL param to access the tenant
    "access_code" varchar,

    -- Used in authenticating the connection of director account
    "auth_token" varchar,
    UNIQUE (access_code),
    PRIMARY KEY ("tenant_id")
);

CREATE TABLE "fm"."admins" (
    "admin_id" INT NOT NULL DEFAULT nextval('fm.admin_id_seq'::regclass),
    "phone" varchar DEFAULT NULL,
    "email" varchar DEFAULT NULL,
    "name" varchar,
    "password" varchar,
    "permissions" varchar NOT NULL DEFAULT 'ADMIN',
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id"),
    UNIQUE (phone),
    UNIQUE (email),
    PRIMARY KEY ("admin_id")
);

CREATE TABLE "fm"."sms" (
    "sms_id" INT NOT NULL DEFAULT nextval('fm.sms_id_seq'::regclass),
    "customer_id" int4 REFERENCES fm.customers("customer_id"),
    "body" varchar,
    "phone" varchar,
    "sid" varchar,
    "direction" varchar,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    UNIQUE (phone),
    UNIQUE (customer_id),
    PRIMARY KEY ("sms_id")
);

CREATE TABLE "fm"."menus" (
    "menu_id" int4 NOT NULL DEFAULT nextval('fm.menu_id_seq'::regclass),
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" varchar,
    PRIMARY KEY ("menu_id"),
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE
);

CREATE TABLE "fm"."headers" (
    "header_id" int4 NOT NULL DEFAULT nextval('fm.header_id_seq'::regclass),
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    "menu_id" int4 REFERENCES fm.menus("menu_id") ON DELETE SET NULL,
    "name" varchar,
    "sub_header" varchar,
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    PRIMARY KEY ("header_id")
);

CREATE TABLE "fm"."items" (
    "item_id" int4 NOT NULL DEFAULT nextval('fm.item_id_seq'::regclass),
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    "menu_id" int4 REFERENCES fm.menus("menu_id") ON DELETE CASCADE,
    "header_id" int4 REFERENCES fm.headers("header_id") ON DELETE SET NULL,
    "base_price" varchar,
    "description" varchar,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "name" varchar,
    PRIMARY KEY ("item_id"),
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    FOREIGN KEY ("menu_id") REFERENCES fm.menus("menu_id")
);

CREATE TABLE "fm"."choices" (
    "choice_id" int4 NOT NULL DEFAULT nextval('fm.choice_id_seq'::regclass),
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    "header" varchar,
    "sub_header" varchar,
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    PRIMARY KEY ("choice_id")
);

CREATE TABLE "fm"."selections" (
    "selection_id" int4 NOT NULL DEFAULT nextval('fm.selection_id_seq'::regclass),
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    "item_id" int4 DEFAULT null REFERENCES fm.items("item_id") ON DELETE SET NULL,
    "name" varchar,
    "value_add" varchar,
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    PRIMARY KEY ("selection_id")
);

CREATE TABLE "fm"."images" (
    "image_id" int4 NOT NULL DEFAULT nextval('fm.image_id_seq'::regclass),
    "cloudinary_id" VARCHAR(128),
    "image_url" varchar,
    "uploaded_at" timestamptz NOT NULL DEFAULT now(),
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    "item_id" int4 DEFAULT null REFERENCES fm.items("item_id") ON DELETE SET NULL,
    "menu_id" int4 DEFAULT null REFERENCES fm.menus("menu_id") ON DELETE SET NULL,
    UNIQUE (item_id),
    UNIQUE (menu_id),
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    FOREIGN KEY ("item_id") REFERENCES fm.items("item_id") ON DELETE SET NULL,
    FOREIGN KEY ("menu_id") REFERENCES fm.menus("menu_id") ON DELETE SET NULL,
    PRIMARY KEY ("image_id")
);

CREATE TABLE "fm"."orders" (
    "order_id" int4 NOT NULL DEFAULT nextval('fm.order_id_seq'::regclass),
    "total" bigint,
    "admin_id" int4 REFERENCES fm.admins("admin_id"),
    "customer_id" int4 REFERENCES fm.customers("customer_id"),
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    "charge" varchar,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    FOREIGN KEY ("customer_id") REFERENCES fm.customers("customer_id"),
    FOREIGN KEY ("admin_id") REFERENCES fm.admins("admin_id"),
    PRIMARY KEY ("order_id")
);

-- Many to Many relationships

CREATE TABLE "fm"."customers_to_tenants" (
    "tenant_id" INT NOT NULL,
    "customer_id" INT NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("customer_id", "tenant_id"),
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON UPDATE CASCADE,
    FOREIGN KEY ("customer_id") REFERENCES fm.customers("customer_id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "fm"."choices_to_items" (
    "choice_id" INT NOT NULL,
    "item_id" INT NOT NULL,
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,

    PRIMARY KEY ("item_id", "choice_id"),
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,
    FOREIGN KEY ("choice_id") REFERENCES fm.choices("choice_id") ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("item_id") REFERENCES fm.items("item_id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "fm"."selections_to_choices" (
    "selection_id" INT NOT NULL,
    "choice_id" INT NOT NULL,
    "tenant_id" int4 REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,

    PRIMARY KEY ("selection_id", "choice_id"),
    FOREIGN KEY ("tenant_id") REFERENCES fm.tenants("tenant_id") ON DELETE CASCADE,

    FOREIGN KEY ("choice_id") REFERENCES fm.choices("choice_id") ON UPDATE CASCADE,
    FOREIGN KEY ("selection_id") REFERENCES fm.selections("selection_id") ON UPDATE CASCADE
);