from typing import Any, Tuple


def response(code: int, contents: Any = None, error: str = None) -> Tuple[dict, int]:
    """Generate a status for returning from API endpoings

    Any keyword arguments passed in will go into a dictionary that will become a
    JSON body in the response

    :param code: The status code (200, 409, etc.)
    :type code: int
    :param contents: The data contents for a successful response
    :type contents: Any
    :param error: The error message for an unsuccessful response
    :type error: str
    :return: The keyword arguments and the return code
    :rtype: Tuple[dict, int]
    """
    json_data = {"contents": contents} if error is None else {"error": error}
    return json_data, code
