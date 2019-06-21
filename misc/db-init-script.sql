CREATE DATABASE vmware_ripoff;

USE vmware_ripoff;

CREATE TABLE hosting_providers (id INTEGER AUTO_INCREMENT, provider_name VARCHAR(50), PRIMARY KEY (id));

CREATE TABLE servers (id INTEGER AUTO_INCREMENT, alias VARCHAR(50), ip_address VARCHAR(30), hostingId INTEGER, server_status BOOLEAN, time_created INTEGER, PRIMARY KEY(id), FOREIGN KEY(hostingId) REFERENCES hosting_providers(id));

INSERT INTO `vmware_ripoff`.`hosting_providers` (`id`, `provider_name`) VALUES ('1', 'Amazon');
INSERT INTO `vmware_ripoff`.`hosting_providers` (`id`, `provider_name`) VALUES ('2', 'Google');
INSERT INTO `vmware_ripoff`.`hosting_providers` (`id`, `provider_name`) VALUES ('3', 'Azure');
INSERT INTO `vmware_ripoff`.`hosting_providers` (`id`, `provider_name`) VALUES ('4', 'Yossi-Servers Inc');


