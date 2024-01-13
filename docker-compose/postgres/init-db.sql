--
-- PostgreSQL database dump
--

-- Dumped from database version 13.11
-- Dumped by pg_dump version 13.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: userpg
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO userpg;

--
-- Name: categorias; Type: TABLE; Schema: public; Owner: userpg
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nome text NOT NULL
);


ALTER TABLE public.categorias OWNER TO userpg;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: userpg
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categorias_id_seq OWNER TO userpg;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: userpg
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: clientes; Type: TABLE; Schema: public; Owner: userpg
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    nome text NOT NULL,
    cpf text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.clientes OWNER TO userpg;

--
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: userpg
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_id_seq OWNER TO userpg;

--
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: userpg
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- Name: pagamentos; Type: TABLE; Schema: public; Owner: userpg
--

CREATE TABLE public.pagamentos (
    id integer NOT NULL,
    id_cliente integer,
    id_pedido integer NOT NULL,
    id_transacao integer NOT NULL,
    descricao text NOT NULL,
    plataforma text NOT NULL,
    valor double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.pagamentos OWNER TO userpg;

--
-- Name: pagamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: userpg
--

CREATE SEQUENCE public.pagamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pagamentos_id_seq OWNER TO userpg;

--
-- Name: pagamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: userpg
--

ALTER SEQUENCE public.pagamentos_id_seq OWNED BY public.pagamentos.id;


--
-- Name: produtos; Type: TABLE; Schema: public; Owner: userpg
--

CREATE TABLE public.produtos (
    id integer NOT NULL,
    nome text NOT NULL,
    id_categoria integer NOT NULL,
    valor double precision NOT NULL,
    descricao text NOT NULL,
    imagem text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.produtos OWNER TO userpg;

--
-- Name: produtos_id_seq; Type: SEQUENCE; Schema: public; Owner: userpg
--

CREATE SEQUENCE public.produtos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produtos_id_seq OWNER TO userpg;

--
-- Name: produtos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: userpg
--

ALTER SEQUENCE public.produtos_id_seq OWNED BY public.produtos.id;


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- Name: pagamentos id; Type: DEFAULT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.pagamentos ALTER COLUMN id SET DEFAULT nextval('public.pagamentos_id_seq'::regclass);


--
-- Name: produtos id; Type: DEFAULT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.produtos ALTER COLUMN id SET DEFAULT nextval('public.produtos_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: userpg
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
bb88dd4c-2a64-4f62-b355-2eb98bda0141	3c18b6929e545452e47d5b38aa62609b5dcd061762c3a79ecfd799e88cdb2b7c	2023-07-05 01:36:20.655883+00	20230611003257_init	\N	\N	2023-07-05 01:36:20.563064+00	1
c69764ea-895c-4486-bb95-cc9b14d95dcb	ac7223ebd4353e8496e64c03481c318234333e996c3ed4707f747039fdfb8646	2023-07-05 01:36:20.720688+00	20230628022303_add_categoria_table	\N	\N	2023-07-05 01:36:20.67558+00	1
529cfb3f-f626-4fe7-9368-311ae3647123	f2cedd904c36ecbf7b2cfceeb51d4001e02b03aa8847670865f0acd1bbee9518	2023-07-05 01:36:20.759111+00	20230628123806_20230628_produtos	\N	\N	2023-07-05 01:36:20.725263+00	1
49e1ae24-b4e1-41ec-88f5-9b5c7a6fc700	ad41b6d225a5649f41ca8f3bcc229add5c7340ec42deb319587208d7939a26d9	2023-07-05 01:36:20.789289+00	20230628130635_20230628_produto2	\N	\N	2023-07-05 01:36:20.767494+00	1
3d0c792e-a005-4ae3-ac7f-1b1162c3aa3d	7feca6eb7ddf4c87272b15f1c4b56f44f539e991ae4bb36e781d0137ce8ee13d	2023-07-05 01:36:20.842564+00	20230705000633_add_pagamento_table	\N	\N	2023-07-05 01:36:20.793215+00	1
\.


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: userpg
--

COPY public.categorias (id, nome) FROM stdin;
1	Lanche
3	Bebida
4	Sobremesa
2	Acompanhamento
\.


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: userpg
--

COPY public.clientes (id, nome, cpf, "createdAt") FROM stdin;
\.


--
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: userpg
--

COPY public.pagamentos (id, id_cliente, id_pedido, id_transacao, descricao, plataforma, valor, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: userpg
--

COPY public.produtos (id, nome, id_categoria, valor, descricao, imagem, "createdAt", "updatedAt") FROM stdin;
4	Hexa Dog	1	12.9	Cachorro quente minimalista	https://images.unsplash.com/photo-1612392062422-ef19b42f74df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
3	Big Hexa	1	25.9	Hambúrguer, salada, queijo.	https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
1	Hexa Lanche Feliz	1	19.95	O clássico: pão, carne, e queijo.	https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
7	Onion rings	2	21.9	Deliciosamente crocantes (400g)	https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
6	Batata frita	2	15.9	Deliciosamente crocantes (400g)	https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1625&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
9	Hexa Bier 300ml	3	15.9	Produção local	https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
8	Água sem gás 500ml	3	4.5	Para matar a sede	https://images.unsplash.com/photo-1561041695-d2fadf9f318c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
11	Hexa Brownie	4	14.5	Brownie de chocolate com duas bolas de sorvete	https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
10	Hexa Bier 500ml	3	21.9	Produção local	https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
2	Big Hexa Duplo	1	29.9	Dois hambúrgueres, salada, muito queijo.	https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
5	Chips de batata	2	9.9	Deliciosamente crocantes (300g)	https://images.unsplash.com/photo-1528751014936-863e6e7a319c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80	2023-07-05 01:39:43.422	2023-07-05 01:39:43.422
\.


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: userpg
--

SELECT pg_catalog.setval('public.categorias_id_seq', 1, false);


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: userpg
--

SELECT pg_catalog.setval('public.clientes_id_seq', 1, false);


--
-- Name: pagamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: userpg
--

SELECT pg_catalog.setval('public.pagamentos_id_seq', 1, false);


--
-- Name: produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: userpg
--

SELECT pg_catalog.setval('public.produtos_id_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: pagamentos pagamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- Name: clientes_cpf_key; Type: INDEX; Schema: public; Owner: userpg
--

CREATE UNIQUE INDEX clientes_cpf_key ON public.clientes USING btree (cpf);


--
-- Name: pagamentos_id_transacao_key; Type: INDEX; Schema: public; Owner: userpg
--

CREATE UNIQUE INDEX pagamentos_id_transacao_key ON public.pagamentos USING btree (id_transacao);


--
-- Name: pagamentos pagamentos_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.clientes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: produtos produtos_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: userpg
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

