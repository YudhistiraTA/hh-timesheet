CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    rate DECIMAL NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO
    users (name, rate)
VALUES
    ('Timothy Pradana', 12000);

CREATE TABLE projects (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO
    projects (name)
VALUES
    ('Aplikasi Website'),
    ('Desain UI'),
    ('Asisten Virtual'),
    ('Desain Logo'),
    ('Aplikasi Timesheet'),
    ('Dokumentasi');

CREATE TABLE activities (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO
    activities (
        name,
        date_start,
        date_end,
        time_start,
        time_end,
        project_id,
        user_id
    )
VALUES
    (
        'Wireframing untuk fitur/flow bidding',
        '2023-10-01',
        '2023-10-01',
        '08:00:00',
        '16:00:00',
        2,
        1
    ),
    (
        'Meeting',
        '2023-10-02',
        '2023-10-02',
        '08:50:00',
        '17:30:00',
        6,
        1
    ),
    (
        'Meeting',
        '2023-10-03',
        '2023-10-03',
        '10:30:00',
        '15:00:00',
        2,
        1
    );