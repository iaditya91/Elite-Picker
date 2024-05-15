# Database connection and schema

import mysql.connector

cnx = mysql.connector.connect(
    user='root',
    password='password',
    host='localhost',
    database='chatgenie'
)

cursor = cnx.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT,
        name VARCHAR(255),
        description TEXT,
        category VARCHAR(255),
        attributes TEXT,
        PRIMARY KEY (id)
    )
''')
cnx.commit()
cursor.close()
cnx.close()