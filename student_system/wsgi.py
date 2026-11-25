"""
WSGI config for student_system project.

It exposes the WSGI callable as a module-level variable named ``application``
(and ``app`` as an alias for platforms that look for that name).

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'student_system.settings')

application = get_wsgi_application()


def _auto_setup():
    """Optionally create tables + demo accounts/data once per cold start.

    Controlled by settings.AUTO_SETUP (see settings.py). Static files are NOT collected
    here: Vercel runs `collectstatic` during the build.
    """
    from django.conf import settings

    if not getattr(settings, 'AUTO_SETUP', False):
        return

    from django.core.management import call_command

    try:
        call_command('migrate', interactive=False, verbosity=0)
        call_command('setup_test_data', student_count=100, interactive=False)
    except Exception as exc:  # never block the site from starting
        print(f'Startup setup notice: {exc}', file=sys.stderr)


_auto_setup()

# Alias used by some hosts
app = application
