{% extends "./layout.swig" %}

{% block main %}

<section class="row">
  <div class="col-xs-12">
    <h2>
      <span class="h2thin">Monlam</span><span class="h2thick">Highlights</span>
    </h2>
  </div>

  <div class="col-xs-12">
    <div class="row">
      
      {% for highlight in highlights %}
        <div class="col-xs-12 col-sm-4 col-md-3" style="height: 135px; overflow: hidden; margin-bottom: 1em;">
          <img alt="placeholder_image" src="{{highlight.imagesrc}}" style="height: 100%; width: 100%; max-width: 230px; "/>
        </div>
      {% endfor %}

    </div>
  </div>

</section>
{% endblock %}
