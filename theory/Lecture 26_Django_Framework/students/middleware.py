# ==========================================
# Lecture 27 - Task 1: request logging middleware
# Logs the method, path, status code and time taken for every request.
# Registered in settings.MIDDLEWARE as 'students.middleware.SimpleLoggingMiddleware'
# ==========================================

import logging
import time

logger = logging.getLogger("students.requests")


class SimpleLoggingMiddleware:
    def __init__(self, get_response):
        # Django gives us the next middleware (or the view) once, at start-up
        self.get_response = get_response

    def __call__(self, request):
        # Code before the view runs
        start_time = time.perf_counter()

        response = self.get_response(request)

        # Code after the view has returned a response
        duration_ms = (time.perf_counter() - start_time) * 1000
        logger.info(
            "%s %s -> %s (%.2f ms)",
            request.method,
            request.get_full_path(),
            response.status_code,
            duration_ms,
        )

        # Extra header so the timing can also be seen in DevTools / curl -i
        response["X-Response-Time-ms"] = f"{duration_ms:.2f}"
        return response
