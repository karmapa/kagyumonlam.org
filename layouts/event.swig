{% extends "./layout.swig" %}

{% block main %}

  <h2>{{title}}</h2>

  {{contents|safe}}

  {% for section in schedule_sections %}
    <div class="section">
      <h3>{{section.title}}</h3>
      <p>{{section.subtitle}}</p>
      <p>Dates: {{section.date}}</p>
      {% if section.time %}
        <p>Time: {{section.time}}</p>
      {% endif %}
      <p>Location: {{section.location}}</p>
      <div class="section_schedule">
        {% for schedule_item in section.schedule %}

					{% if	schedule_item.heading %}
						<div class="schedule_heading">
							{{schedule_item.heading}}
						</div>
					{% endif %}

          <div class="schedule_item">
            {% if schedule_item.marker %}
              <span class="schedule_marker">{{schedule_item.marker}}</span>
            {% endif %}
            <span class="schedule_time">{{schedule_item.time}}</span>
            <span class="schedule_description">{{schedule_item.description}}</span>
          </div>

        {% endfor %}
      </div>
    </div>
  {% endfor %}
  
{% endblock %}
