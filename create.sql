drop schema carneiro cascade;

create schema carneiro;

create table carneiro.contract (
    id_contract uuid not null default uuid_generate_v4() primary key,
    description text,
    amount numeric,
    periods integer,
    date timestamp
);

create table carneiro.payment (
    id_payment uuid not null default uuid_generate_v4() primary key,
    id_contract uuid references carneiro.contract(id_contract),
    amount numeric,
    date timestamp
);

insert into carneiro.contract (id_contract, description, amount, periods, date) values ('d23aaef6-474a-4b77-913f-d717a62355a2', 'Prestação de serviços escolares', 6000, 12, '2025-01-01T10:00:00');
insert into carneiro.payment (id_payment, id_contract, amount, date) values ('66084881-0933-4b85-82a7-90e6cf3cff52', 'd23aaef6-474a-4b77-913f-d717a62355a2', 6000, '2025-01-01T10:00:00');


