{% extends "./layout.swig" %}

{% block main %}

<section class="row">
  <div class="col-xs-12">
    <h2>
      <span class="h2thin">Monlam</span><span class="h2thick">News</span>
    </h2>
  </div>

  <div class="col-xs-12">
    <div class="row">
      
      {% for post in retrievedPosts.all %}
        <div class="col-xs-12 col-sm-4 col-md-3" style="height: 135px; overflow: hidden; margin-bottom: 1em;">
          <img alt="{{post.alt}}" src="{{post.img.src}}" style="height: 100%; width: 100%; max-width: 230px; "/>
        </div>
      {% endfor %}

    </div>
  </div>

</section>

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
          <a href="{{highlight.guid}}">
            <img alt="{{retrievedPosts.byguid[highlight.guid].alt}}" src="{{retrievedPosts.byguid[highlight.guid].img.src}}" style="height: 100%; width: 100%; max-width: 230px; "/>
          </a>
        </div>
      {% endfor %}

    </div>
  </div>

</section>
{% endblock %}
