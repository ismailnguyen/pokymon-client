export function requireAuth (to, from, next)
{
    if (!isLoggedIn())
    {
        next({
            path: '/',
            //query: { redirect: to.fullPath }
        });
    }
    else
    {
        next();
    }
}

export function isLoggedIn ()
{
    if (localStorage.getItem('user') === null)
    {
        return false;
    }

    return true;
}

export function getRememberMe ()
{
    return JSON.parse(localStorage.getItem('rememberMe'));
}

export function getUser ()
{
    return JSON.parse(localStorage.getItem('user'));
}

export function getRoomId ()
{
    return JSON.parse(localStorage.getItem('roomId'));
}

export function createSession (user, roomId, rememberMe)
{
    if (user === null)
    {
        return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('roomId', JSON.stringify(roomId));
    localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
}
