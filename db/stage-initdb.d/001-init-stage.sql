/*
Script de création de la base de données de test.
A noter, on utilise une stratégie avec DROP et IF NOT EXISTS afin de rendre 
notre script réutilisable dans le future, même si la base existe déjà
*/
create database IF NOT EXISTS challenge_prod;

/* Créer l'utilisateur API */
create user IF NOT EXISTS 'challenge-api-prod'@'%.%.%.%' identified by 'api-prod-password';
grant select, update, insert, delete on challenge_prod.* to 'challenge-api-prod'@'%.%.%.%';
flush privileges;
