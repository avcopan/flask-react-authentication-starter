from project_name._pool import pg_connection, pg_cursor


# USER TABLE
def get_user(id: int, return_password: bool = False) -> dict:
    """Look up a user by ID

    :param id: The user's ID
    :type id: int
    :param return_password: Return password with user data?, defaults to False
    :type return_password: bool, optional
    :return: The user data; keys: "id", "email"
    :rtype: dict
    """
    with pg_connection() as conn:
        query_string = """
            SELECT * FROM users WHERE id = %s;
        """
        query_params = [id]

        with pg_cursor(conn) as cursor:
            cursor.execute(query_string, query_params)
            user = cursor.fetchone()

        if user and not return_password:
            user.pop("password")

    return user


def lookup_user(email: str, return_password: bool = False) -> dict:
    """Look up a user by email

    :param email: The user's email
    :type email: str
    :param return_password: Return password with user data?, defaults to False
    :type return_password: bool, optional
    :return: The user data; keys: "id", "email", "password"
    :rtype: dict
    """
    with pg_connection() as conn:
        query_string = """
            SELECT * FROM users WHERE email = %s;
        """
        query_params = [email]

        with pg_cursor(conn) as cursor:
            cursor.execute(query_string, query_params)
            user = cursor.fetchone()

        if user and not return_password:
            user.pop("password")

    return user


def add_user(email: str, password: str, return_password: bool = False) -> dict:
    """Add a new user, returning the user's data with their assigned ID

    Automatically creates a new collection for the user

    :param email: The user's email
    :type email: str
    :param password: The user's password
    :type password: str
    :param return_password: Return password with user data?, defaults to False
    :type return_password: bool, optional
    :return: The user data; keys: "id", "email", "password"
    :rtype: dict
    """
    with pg_connection() as conn:
        query_string = """
            INSERT INTO users (email, password) VALUES (%s, %s)
            RETURNING *;
        """
        query_params = [email, password]

        with pg_cursor(conn) as cursor:
            cursor.execute(query_string, query_params)
            user_row = cursor.fetchone()

        if user_row and not return_password:
            user_row.pop("password")

    return user_row
