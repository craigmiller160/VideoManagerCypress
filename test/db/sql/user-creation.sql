INSERT INTO users (user_id, user_name, password, first_name, last_name)
VALUES (1, 'admin@gmail.com', '$2a$10$ytpfmAxR8lh9KwnWtkiinOYWn2779iJE3rE6BWLzHzwEh9Q9hJGv2', 'Admin', 'User'),
    (2, 'edit@gmail.com', '$2a$10$ytpfmAxR8lh9KwnWtkiinOYWn2779iJE3rE6BWLzHzwEh9Q9hJGv2', 'Edit', 'User'),
    (3, 'scan@gmail.com', '$2a$10$ytpfmAxR8lh9KwnWtkiinOYWn2779iJE3rE6BWLzHzwEh9Q9hJGv2', 'Scan', 'User'),
    (4, 'standard@gmail.com', '$2a$10$ytpfmAxR8lh9KwnWtkiinOYWn2779iJE3rE6BWLzHzwEh9Q9hJGv2', 'Standard', 'User'),
    (5, 'all@gmail.com', '$2a$10$ytpfmAxR8lh9KwnWtkiinOYWn2779iJE3rE6BWLzHzwEh9Q9hJGv2', 'All Roles', 'User');

INSERT INTO user_roles (user_id, role_id)
VALUES (5, 1), -- All Roles User, Edit Role
    (5, 2), -- All RolesUser, Admin Role
    (5, 3), -- All Roles User, Scan Role
    (2, 1), -- Edit User, Edit Role
    (3, 3), -- Scan User, Scan Role,
    (1, 2);

