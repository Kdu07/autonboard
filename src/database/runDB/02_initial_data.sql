-- 1. Inserindo um Cliente
INSERT INTO CUSTOMER (name, email) 
VALUES ('Tech Corp Brasil', 'contato@techcorp.com.br');

-- 2. Inserindo um Prédio para este Cliente (ID 1)
INSERT INTO BUILDING (customer_id, name, type, address, number_of_floors, total_area, images_url)
VALUES (1, 'Edifício Inovação', 'Comercial', 'Av. Paulista, 1000, São Paulo - SP', 15, 5000.00, '["https://cdn.img/predio1.jpg"]');

-- 3. Inserindo Andares para o Prédio (ID 1)
INSERT INTO FLOOR (building_id, floor_number, floor_area) VALUES (1, 0, 400.00); -- Térreo
INSERT INTO FLOOR (building_id, floor_number, floor_area) VALUES (1, 1, 350.00); -- 1º Andar

-- 4. Inserindo uma Amenidade Principal (Ex: Coworking no 1º Andar)
INSERT INTO AMENITY (building_id, floor_id, name, type, capacity, area_m2, images_url)
VALUES (1, 2, 'Espaço Coworking Principal', 'Shared Space', 50, 120.50, '["https://cdn.img/amenity1.jpg"]');

-- 5. Inserindo uma Sub-Amenidade (Ex: Sala de Reunião dentro do Coworking - ID 1)
INSERT INTO AMENITY (building_id, floor_id, parent_amenity_id, name, type, capacity, area_m2)
VALUES (1, 2, 1, 'Sala de Reunião Alpha', 'Meeting Room', 8, 25.00);

-- 6. Configurações para a Sala de Reunião (Amenity ID 2)
INSERT INTO AMENITY_CONFIGURATION (amenity_id, key, value, reservable, image_url)
VALUES (2, 'equipamento', 'Protetor 4K, Quadro Branco', true, 'https://cdn.img/sala_alpha.jpg');

INSERT INTO AMENITY_CONFIGURATION (amenity_id, key, value, reservable)
VALUES (2, 'ar_condicionado', 'Central - 22 graus fixo', false);

-- 7. Uma submissão de arquivo do Cliente
INSERT INTO SUBMISSION (customer_id, status, file_path)
VALUES (1, 'processed', '/uploads/plantas/edificio_inovacao_v1.pdf');