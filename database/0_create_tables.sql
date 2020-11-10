-- Schema

CREATE SCHEMA IF NOT EXISTS fm;

-- Sequences

CREATE SEQUENCE IF NOT EXISTS fm.admin_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.customer_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.organization_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.menu_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.menu_item_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.menu_choice_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.menu_selection_id_seq;
CREATE SEQUENCE IF NOT EXISTS fm.menu_header_id_seq;
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

CREATE TABLE "fm"."organizations" (
    "organization_id" int4 NOT NULL DEFAULT nextval('fm.organization_id_seq'::regclass),
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

    -- Used as the URL param to access the organization
    "access_code" varchar,

    -- Used in authenticating the connection of director account
    "auth_token" varchar,
    UNIQUE (access_code),
    PRIMARY KEY ("organization_id")
);

CREATE TABLE "fm"."admins" (
    "admin_id" INT NOT NULL DEFAULT nextval('fm.admin_id_seq'::regclass),
    "phone" varchar DEFAULT NULL,
    "email" varchar DEFAULT NULL,
    "name" varchar,
    "password" varchar,
    "permissions" varchar NOT NULL DEFAULT 'ADMIN',
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "organization_id" int4 REFERENCES fm.organizations("organization_id"),
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
    "organization_id" int4 REFERENCES fm.organizations("organization_id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" varchar,
    PRIMARY KEY ("menu_id"),
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE
);

CREATE TABLE "fm"."menuheaders" (
    "menu_header_id" int4 NOT NULL DEFAULT nextval('fm.menu_header_id_seq'::regclass),
    "organization_id" int4 REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    "menu_id" int4 REFERENCES fm.menus("menu_id") ON DELETE SET NULL,
    "name" varchar,
    "sub_header" varchar,
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    PRIMARY KEY ("menu_header_id")
);

CREATE TABLE "fm"."menuitems" (
    "menu_item_id" int4 NOT NULL DEFAULT nextval('fm.menu_item_id_seq'::regclass),
    "organization_id" int4 REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    "menu_id" int4 REFERENCES fm.menus("menu_id") ON DELETE CASCADE,
    "menu_header_id" int4 REFERENCES fm.menuheaders("menu_header_id") ON DELETE SET NULL,
    "base_price" varchar,
    "description" varchar,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "name" varchar,
    PRIMARY KEY ("menu_item_id"),
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    FOREIGN KEY ("menu_id") REFERENCES fm.menus("menu_id")
);

CREATE TABLE "fm"."menuchoices" (
    "menu_choice_id" int4 NOT NULL DEFAULT nextval('fm.menu_choice_id_seq'::regclass),
    "organization_id" int4 REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    "header" varchar,
    "sub_header" varchar,
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    PRIMARY KEY ("menu_choice_id")
);

CREATE TABLE "fm"."menuselections" (
    "menu_selection_id" int4 NOT NULL DEFAULT nextval('fm.menu_selection_id_seq'::regclass),
    "organization_id" int4 REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    "menu_item_id" int4 DEFAULT null REFERENCES fm.menuitems("menu_item_id") ON DELETE SET NULL,
    "name" varchar,
    "value_add" varchar,
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    PRIMARY KEY ("menu_selection_id")
);

CREATE TABLE "fm"."images" (
    "image_id" int4 NOT NULL DEFAULT nextval('fm.image_id_seq'::regclass),
    "cloudinary_id" VARCHAR(128),
    "image_url" varchar,
    "uploaded_at" timestamptz NOT NULL DEFAULT now(),
    "organization_id" int4 REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    "menu_item_id" int4 DEFAULT null REFERENCES fm.menuitems("menu_item_id") ON DELETE SET NULL,
    "menu_id" int4 DEFAULT null REFERENCES fm.menus("menu_id") ON DELETE SET NULL,
    UNIQUE (menu_item_id),
    UNIQUE (menu_id),
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    FOREIGN KEY ("menu_item_id") REFERENCES fm.menuitems("menu_item_id") ON DELETE SET NULL,
    FOREIGN KEY ("menu_id") REFERENCES fm.menus("menu_id") ON DELETE SET NULL,
    PRIMARY KEY ("image_id")
);

CREATE TABLE "fm"."orders" (
    "order_id" int4 NOT NULL DEFAULT nextval('fm.order_id_seq'::regclass),
    "total" bigint,
    "admin_id" int4 REFERENCES fm.admins("admin_id"),
    "customer_id" int4 REFERENCES fm.customers("customer_id"),
    "organization_id" int4 REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    "charge" varchar,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    FOREIGN KEY ("customer_id") REFERENCES fm.customers("customer_id"),
    FOREIGN KEY ("admin_id") REFERENCES fm.admins("admin_id"),
    PRIMARY KEY ("order_id")
);

-- Many to Many relationships

CREATE TABLE "fm"."customers_to_organizations" (
    "organization_id" INT NOT NULL,
    "customer_id" INT NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("customer_id", "organization_id"),
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON UPDATE CASCADE,
    FOREIGN KEY ("customer_id") REFERENCES fm.customers("customer_id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "fm"."menuchoices_to_menuitems" (
    "menu_choice_id" INT NOT NULL,
    "menu_item_id" INT NOT NULL,
    "organization_id" int4 REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,

    PRIMARY KEY ("menu_item_id", "menu_choice_id"),
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,
    FOREIGN KEY ("menu_choice_id") REFERENCES fm.menuchoices("menu_choice_id") ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("menu_item_id") REFERENCES fm.menuitems("menu_item_id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "fm"."menuselections_to_menuchoices" (
    "menu_selection_id" INT NOT NULL,
    "menu_choice_id" INT NOT NULL,
    "organization_id" int4 REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,

    PRIMARY KEY ("menu_selection_id", "menu_choice_id"),
    FOREIGN KEY ("organization_id") REFERENCES fm.organizations("organization_id") ON DELETE CASCADE,

    FOREIGN KEY ("menu_choice_id") REFERENCES fm.menuchoices("menu_choice_id") ON UPDATE CASCADE,
    FOREIGN KEY ("menu_selection_id") REFERENCES fm.menuselections("menu_selection_id") ON UPDATE CASCADE
);