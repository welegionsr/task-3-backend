CREATE DATABASE vmware_ripoff;

CREATE TABLE hosting_providers (id INTEGER AUTO_INCREMENT, provider_name VARCHAR(50), PRIMARY KEY (id));

CREATE TABLE servers (id INTEGER AUTO_INCREMENT, alias VARCHAR(50), ip_address VARCHAR(30), hostingId INTEGER, server_status BOOLEAN, time_created INTEGER, PRIMARY KEY(id), FOREIGN KEY(hostingId) REFERENCES hosting_providers(id));

