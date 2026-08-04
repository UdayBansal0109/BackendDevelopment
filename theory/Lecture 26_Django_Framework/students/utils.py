# ==========================================
# Lecture 28 - Task 2: service utility for the external API
# All communication with the third-party service is kept here (not in the view).
# ==========================================

import requests

EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/posts/{post_id}"
TIMEOUT_SECONDS = 2


def get_external_data(post_id):
    url = EXTERNAL_API_URL.format(post_id=post_id)

    try:
        response = requests.get(url, timeout=TIMEOUT_SECONDS)
        response.raise_for_status()          # 4xx / 5xx → HTTPError
        return {"data": response.json(), "error": None}
    except requests.Timeout:
        return {"data": None, "error": "External service timed out"}
    except requests.RequestException:
        return {"data": None, "error": "External service is unavailable"}
    except ValueError:
        return {"data": None, "error": "External service returned invalid JSON"}
