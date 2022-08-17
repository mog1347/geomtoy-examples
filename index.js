
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
const tpl = `<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="//localhost:1347/css/tweakpane.css" />
<link rel="stylesheet" href="//localhost:1347/css/prism-one-light.css" />
<link rel="stylesheet" href="//localhost:1347/css/sidebar.css" />

<nav class="navbar navbar-expand-lg bg-body sticky-top shadow-sm">
    <div class="container-xxl">
        <a class="navbar-brand" href="/">
            <svg width="50" height="50" viewBox="0 0 707 707" version="1.1" xmlns="http://www.w3.org/2000/svg" class="d-inline-block align-middle">
                <g transform="matrix(0.707,0.707,-0.707,0.707,353.5,0)">
                    <path fill="#333333" stroke="none" d="M0,0V500H500V200H400V400H100V100H500V0Z" />
                    <path fill="#004ddf" stroke="none" d="M200,200V300H300V200Z" />
                </g>
            </svg>
            <span class="d-none d-sm-inline-block fw-bold">Geomtoy Examples</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</nav>


<div class="container-xxl">
    <div class="py-3">
        <figure class="text-center">
            <h1 class="display-1 mt-5">Geomtoy</h1>
            <blockquote class="blockquote">
                <p>A 2D geometry responsive computing, visualizing and interacting library.</p>
            </blockquote>
        </figure>

        <div class="text-center">
            <a type="button" class="btn d-inline-block mt-5 btn-primary btn-lg" href="/default.html">View Examples</a>
            <br />
            <a href="/" class="d-inline-block mt-3">View API documents</a>
        </div>

        <h2>Quick start</h2>

        <h2>Basic usage</h2>

        <h2>Limitations</h2>

        <h2>Usage with CDNs</h2>

        <h2>Usage with Bundlers</h2>

        <h2>Usage with Node</h2>

        <h2>List of features</h2>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
        </ul>
    </div>
</div>
`;

document.body.insertAdjacentHTML("afterbegin", tpl);
