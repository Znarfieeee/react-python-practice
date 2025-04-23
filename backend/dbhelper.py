import sqlite3
from sqlite3 import connect, Row

database = 'reactpy.db'

def getallprocess(sql:str, params=())-> list:
    db = connect(database)
    db.row_factory = Row
    cursor = db.cursor()
    cursor.execute(sql,params)
    data = cursor.fetchall()
    cursor.close()
    db.close()
    return data

def postprocess(sql:str, params=())-> bool:
    db = connect(database)
    cursor = db.cursor()
    cursor.execute(sql, params)
    db.commit()
    cursor.close()
    db.close()
    return True if cursor.rowcount > 0 else False
    
def addprocess(table, **kwargs)-> dict:
    keys = list(kwargs.keys())
    values = [f"'{val}'" for val in kwargs.values()]
    
    flds = "`,`".join(keys)
    data = ", ".join(values)
    sql = f"INSERT INTO `{table}` (`{flds}`) VALUES ({ data })"
    
    return postprocess(sql)

def updateprocess(table, **kwargs)-> dict:
    id = kwargs.pop('id')
    updates = []
    
    for key, value in kwargs.items():
        if value is None:
            updates.append(f"`{key}` = NULL")
        else:
            updates.append(f"`{key}` = '{value}'")
            
    update = ", ".join(updates)
    sql = f"UPDATE {table} SET {update} WHERE id = ?"
    
    return postprocess(sql, (id,))

def deleteprocess(table, **kwargs)-> dict:
    id = kwargs.pop('id')
    
    sql = f"DELETE FROM {table} WHERE id = ?"
    
    return postprocess(sql, (id,))

def findprocess(table, id)-> bool:
    sql = f"SELECT * FROM {table} WHERE ID = ?"
    rows = getallprocess(sql, (id,))
    return dict(rows[0]) if rows else None  # Return the first row as a dictionary, or None if no rows are found

def getuser(sql:str, params=())-> list:
    db = connect(database)
    cursor = db.cursor()
    cursor.execute(sql, params)
    data = cursor.fetchall()
    cursor.close()
    db.close()
    return data

def to_json(rows):
    """
    Converts a list of sqlite3.Row objects to a list of dictionaries.
    """
    return [dict(row) for row in rows]