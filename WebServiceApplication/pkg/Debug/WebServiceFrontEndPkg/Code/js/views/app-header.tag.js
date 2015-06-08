import riot from 'riot'

riot.tag('app-header',

    `<nav role="navigation" class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" data-target="#menu" data-toggle="collapse" class="navbar-toggle">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="#" class="navbar-brand">Service Fabric Multi Deployment Demo</a>
            </div>
            <div id="menu" class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#/profile">Signed in as <span class="username"></span></a></li>
                    <li><a id="logout" href="#">Logout</a></li>
                </ul>            
            </div>
        </div>
    </nav>`,

    function(user){

        this.on('mount', () => {
            $('.username').html(user.profile.name)
            $('#logout').on('click', function() {
                user.logout()
            })
        })
    })
