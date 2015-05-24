<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>@yield('title') - Maritza</title>
    @section('assets')
        <link rel="stylesheet" href="/css/app.css"/>
        <script type="text/javascript" src="/js/lib/jquery.min.js"></script>
        <script type="text/javascript" src="/js/lib/bootstrap.min.js"></script>
    @show
</head>
<body>
    @yield('content')
    @yield('assets_bottom')
</body>
</html>