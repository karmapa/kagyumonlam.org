<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{{title}}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="/build.js"></script>

  </head>
  <body>
    <!--<pre>
      path: {{path}}
      currentNavigation: {{currentNavigation|json}}
    </pre>-->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Kagyu Monlam</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            {% for n in navigation %}

              <li {% if n.url == path %}class="active"{% endif %}>
                <a href="{{n.url}}">{{n.title}}</a>
                {% if n.url == path %}
                  <span class="sr-only">(current)</span>
                {% endif %}
              </li>

            {% endfor %}
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>


		<main role="main" class="container">
      {% if currentNavigation.children %}
        <nav>
          <ul class="nav nav-pills">
            {% for n in currentNavigation.children %}
              <li role="presentation" {% if n.url == path %}class="active"{% endif %}><a href="{{n.url}}">{{n.title}}</a></li>
            {% endfor %}
          </ul>
        </nav>
      {% endif %}

      {% block main %}
        {% autoescape false %}
          {{contents}}
        {% endautoescape %}
      {% endblock %}
    </main>

  </body>
</html>
