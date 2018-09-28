import React from 'react'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import {
  Row,
  Col,
  Box,
  BoxHeader,
  BoxBody,
  BoxFooter,
  Percentage
} from '../../components'

const WidgetSales = () => (
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs pull-right">
      <li class="active"><a href="#revenue-chart" data-toggle="tab">Area</a></li>
      <li><a href="#sales-chart" data-toggle="tab">Donut</a></li>
      <li class="pull-left header"><i class="fa fa-inbox"></i> Sales</li>
    </ul>
    <div class="tab-content no-padding">
      <div class="chart tab-pane active" id="revenue-chart" style={{position: 'relative', height: '300px'}}/>
      <div class="chart tab-pane" id="sales-chart" style={{position: 'relative', height: '300px'}}/>
    </div>
  </div>
)
const WidgetChat = () => (
  <div class="box box-success">
    <div class="box-header">
      <i class="fa fa-comments-o"></i>
      <h3 class="box-title">Chat</h3>
      <div class="box-tools pull-right" data-toggle="tooltip" title="Status">
        <div class="btn-group" data-toggle="btn-toggle">
          <button type="button" class="btn btn-default btn-sm active"><i class="fa fa-square text-green"></i>
          </button>
          <button type="button" class="btn btn-default btn-sm"><i class="fa fa-square text-red"></i></button>
        </div>
      </div>
    </div>
    <div class="box-body chat" id="chat-box">
      <div class="item">
        <img src="/adminlte/dist/img/user4-128x128.jpg" alt="user image" class="online"/>
        <p class="message">
          <a href="#" class="name">
            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 2:15</small>
            Mike Doe
          </a>
          I would like to meet you to discuss the latest news about
          the arrival of the new theme. They say it is going to be one the
          best themes on the market
        </p>
        <div class="attachment">
          <h4>Attachments:</h4>
          <p class="filename">
            Theme-thumbnail-image.jpg
          </p>
          <div class="pull-right">
            <button type="button" class="btn btn-primary btn-sm btn-flat">Open</button>
          </div>
        </div>
      </div>
      <div class="item">
        <img src="/adminlte/dist/img/user3-128x128.jpg" alt="user image" class="offline"/>
        <p class="message">
          <a href="#" class="name">
            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:15</small>
            Alexander Pierce
          </a>
          I would like to meet you to discuss the latest news about
          the arrival of the new theme. They say it is going to be one the
          best themes on the market
        </p>
      </div>
      <div class="item">
        <img src="/adminlte/dist/img/user2-160x160.jpg" alt="user image" class="offline"/>
        <p class="message">
          <a href="#" class="name">
            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:30</small>
            Susan Doe
          </a>
          I would like to meet you to discuss the latest news about
          the arrival of the new theme. They say it is going to be one the
          best themes on the market
        </p>
      </div>
    </div>
    <div class="box-footer">
      <div class="input-group">
        <input class="form-control" placeholder="Type message..."/>
        <div class="input-group-btn">
          <button type="button" class="btn btn-success"><i class="fa fa-plus"></i></button>
        </div>
      </div>
    </div>
  </div>
)
const WidgetToDoList = () => (
  <div class="box box-primary">
    <div class="box-header">
      <i class="ion ion-clipboard"></i>
      <h3 class="box-title">To Do List</h3>
      <div class="box-tools pull-right">
        <ul class="pagination pagination-sm inline">
          <li><a href="#">&laquo;</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">&raquo;</a></li>
        </ul>
      </div>
    </div>
    {/* <!-- /.box-header --> */}
    <div class="box-body">
      {/* <!-- See dist/js/pages/dashboard.js to activate the todoList plugin --> */}
      <ul class="todo-list">
        <li>
          {/* <!-- drag handle --> */}
          <span class="handle">
            <i class="fa fa-ellipsis-v"></i>
            <i class="fa fa-ellipsis-v"></i>
          </span>
          {/* <!-- checkbox --> */}
          <input type="checkbox" value=""/>
          {/* <!-- todo text --> */}
          <span class="text">Design a nice theme</span>
          {/* <!-- Emphasis label --> */}
          <small class="label label-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
          {/* <!-- General tools such as edit or delete--> */}
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fa fa-ellipsis-v"></i>
            <i class="fa fa-ellipsis-v"></i>
          </span>
          <input type="checkbox" value=""/>
          <span class="text">Make the theme responsive</span>
          <small class="label label-info"><i class="fa fa-clock-o"></i> 4 hours</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fa fa-ellipsis-v"></i>
            <i class="fa fa-ellipsis-v"></i>
          </span>
          <input type="checkbox" value=""/>
          <span class="text">Let theme shine like a star</span>
          <small class="label label-warning"><i class="fa fa-clock-o"></i> 1 day</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fa fa-ellipsis-v"></i>
            <i class="fa fa-ellipsis-v"></i>
          </span>
          <input type="checkbox" value=""/>
          <span class="text">Let theme shine like a star</span>
          <small class="label label-success"><i class="fa fa-clock-o"></i> 3 days</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fa fa-ellipsis-v"></i>
            <i class="fa fa-ellipsis-v"></i>
          </span>
          <input type="checkbox" value=""/>
          <span class="text">Check your messages and notifications</span>
          <small class="label label-primary"><i class="fa fa-clock-o"></i> 1 week</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fa fa-ellipsis-v"></i>
            <i class="fa fa-ellipsis-v"></i>
          </span>
          <input type="checkbox" value=""/>
          <span class="text">Let theme shine like a star</span>
          <small class="label label-default"><i class="fa fa-clock-o"></i> 1 month</small>
          <div class="tools">
            <i class="fa fa-edit"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
      </ul>
    </div>
    {/* <!-- /.box-body --> */}
    <div class="box-footer clearfix no-border">
      <button type="button" class="btn btn-default pull-right"><i class="fa fa-plus"></i> Add item</button>
    </div>
  </div>
)
const WidgetQuickEmail = () => (
  <div class="box box-info">
    <div class="box-header">
      <i class="fa fa-envelope"></i>
      <h3 class="box-title">Quick Email</h3>
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <div class="box-body">
      <form action="#" method="post">
        <div class="form-group">
          <input type="email" class="form-control" name="emailto" placeholder="Email to:"/>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name="subject" placeholder="Subject"/>
        </div>
        <div>
          <textarea
            class="textarea"
            placeholder="Message"
            style={{
              width: '100%',
              height: '125px',
              fontSize: '14px',
              lineHeight: '18px',
              border: '1px solid #dddddd',
              padding: '10px'
            }}></textarea>
        </div>
      </form>
    </div>
    <div class="box-footer clearfix">
      <button type="button" class="pull-right btn btn-default" id="sendEmail">Send
        <i class="fa fa-arrow-circle-right"></i></button>
    </div>
  </div>
)
const WidgetVisitors = () => (
  <div class="box box-solid bg-light-blue-gradient">
    <div class="box-header">
      <div class="pull-right box-tools">
        <button
          type="button"
          class="btn btn-primary btn-sm daterange pull-right"
          data-toggle="tooltip"
          title="Date range">
          <i class="fa fa-calendar"></i></button>
        <button
          type="button"
          class="btn btn-primary btn-sm pull-right"
          data-widget="collapse"
          data-toggle="tooltip"
          title="Collapse"
          style={{marginRight: '5px'}}>
          <i class="fa fa-minus"></i></button>
      </div>
      <i class="fa fa-map-marker"></i>
      <h3 class="box-title">Visitors</h3>
    </div>
    <div class="box-body">
      <div id="world-map"
        style={{
          height: '250px',
          width: '100%'
        }}></div>
    </div>
    <div class="box-footer no-border">
      <div class="row">
        <div class="col-xs-4 text-center"
          style={{
            borderRight: '1px solid #f4f4f4'
          }}
          >
          <div id="sparkline-1"></div>
          <div class="knob-label">Visitors</div>
        </div>
        <div class="col-xs-4 text-center"
          style={{
            borderRight: '1px solid #f4f4f4'
          }}
          >
          <div id="sparkline-2"></div>
          <div class="knob-label">Online</div>
        </div>
        <div class="col-xs-4 text-center">
          <div id="sparkline-3"></div>
          <div class="knob-label">Exists</div>
        </div>
      </div>
    </div>
  </div>

)
const WidgetSalesGraph = () => (
  <div class="box box-solid bg-teal-gradient">
    <div class="box-header">
      <i class="fa fa-th"></i>
      <h3 class="box-title">Sales Graph</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn bg-teal btn-sm" data-widget="collapse"><i class="fa fa-minus"></i></button>
        <button type="button" class="btn bg-teal btn-sm" data-widget="remove"><i class="fa fa-times"></i></button>
      </div>
    </div>
    <div class="box-body border-radius-none">
      <div class="chart" id="line-chart" style={{height: '250px'}}></div>
    </div>
    <div class="box-footer no-border">
      <div class="row">
        <div class="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
          <input type="text" class="knob" data-readonly="true" defaultValue="20" data-width="60" data-height="60" data-fgcolor="#39CCCC"/>
          <div class="knob-label">Mail-Orders</div>
        </div>
        <div class="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
          <input type="text" class="knob" data-readonly="true" defaultValue="50" data-width="60" data-height="60" data-fgcolor="#39CCCC"/>
          <div class="knob-label">Online</div>
        </div>
        <div class="col-xs-4 text-center">
          <input type="text" class="knob" data-readonly="true" defaultValue="30" data-width="60" data-height="60" data-fgcolor="#39CCCC"/>
          <div class="knob-label">In-Store</div>
        </div>
      </div>
    </div>
  </div>
)
const WidgetCalendar = () => (
  <div class="box box-solid bg-green-gradient">
    <div class="box-header">
      <i class="fa fa-calendar"></i>
      <h3 class="box-title">Calendar</h3>
      <div class="pull-right box-tools">
        <div class="btn-group">
          <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bars"></i></button>
          <ul class="dropdown-menu pull-right" role="menu">
            <li><a href="#">Add new event</a></li>
            <li><a href="#">Clear events</a></li>
            <li class="divider"></li>
            <li><a href="#">View calendar</a></li>
          </ul>
        </div>
        <button type="button" class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i></button>
        <button type="button" class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i></button>
      </div>
    </div>
    <div class="box-body no-padding">
      <div id="calendar" style={{width: '100%'}} ></div>
    </div>
    <div class="box-footer text-black">
      <div class="row">
        <div class="col-sm-6">
          <div class="clearfix">
            <span class="pull-left">Task #1</span>
            <small class="pull-right">90%</small>
          </div>
          <div class="progress xs">
            <div class="progress-bar progress-bar-green" style={{width: '90%'}}></div>
          </div>
          <div class="clearfix">
            <span class="pull-left">Task #2</span>
            <small class="pull-right">70%</small>
          </div>
          <div class="progress xs">
            <div class="progress-bar progress-bar-green" style={{width: '70%'}}></div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="clearfix">
            <span class="pull-left">Task #3</span>
            <small class="pull-right">60%</small>
          </div>
          <div class="progress xs">
            <div class="progress-bar progress-bar-green" style={{width: '60%'}}></div>
          </div>
          <div class="clearfix">
            <span class="pull-left">Task #4</span>
            <small class="pull-right">40%</small>
          </div>
          <div class="progress xs">
            <div class="progress-bar progress-bar-green" style={{width: '40%'}} ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
const demoContent = () => {
  $(function () {

    'use strict';

    /* ChartJS
     * -------
     * Here we will create a few charts using ChartJS
     */

    // -----------------------
    // - MONTHLY SALES CHART -
    // -----------------------

    // Get context with jQuery - using jQuery's .get() method.
    var salesChartCanvas = $('#salesChart').get(0).getContext('2d');
    // This will get the first returned node in the jQuery collection.
    var salesChart       = new Chart(salesChartCanvas);

    var salesChartData = {
      labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label               : 'Electronics',
          fillColor           : 'rgb(210, 214, 222)',
          strokeColor         : 'rgb(210, 214, 222)',
          pointColor          : 'rgb(210, 214, 222)',
          pointStrokeColor    : '#c1c7d1',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgb(220,220,220)',
          data                : [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label               : 'Digital Goods',
          fillColor           : 'rgba(60,141,188,0.9)',
          strokeColor         : 'rgba(60,141,188,0.8)',
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    var salesChartOptions = {
      // Boolean - If we should show the scale at all
      showScale               : true,
      // Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines      : false,
      // String - Colour of the grid lines
      scaleGridLineColor      : 'rgba(0,0,0,.05)',
      // Number - Width of the grid lines
      scaleGridLineWidth      : 1,
      // Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      // Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines  : true,
      // Boolean - Whether the line is curved between points
      bezierCurve             : true,
      // Number - Tension of the bezier curve between points
      bezierCurveTension      : 0.3,
      // Boolean - Whether to show a dot for each point
      pointDot                : false,
      // Number - Radius of each point dot in pixels
      pointDotRadius          : 4,
      // Number - Pixel width of point dot stroke
      pointDotStrokeWidth     : 1,
      // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,
      // Boolean - Whether to show a stroke for datasets
      datasetStroke           : true,
      // Number - Pixel width of dataset stroke
      datasetStrokeWidth      : 2,
      // Boolean - Whether to fill the dataset with a color
      datasetFill             : true,
      // String - A legend template
      legendTemplate          : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].lineColor%>\'></span><%=datasets[i].label%></li><%}%></ul>',
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio     : true,
      // Boolean - whether to make the chart responsive to window resizing
      responsive              : true
    };

    // Create the line chart
    salesChart.Line(salesChartData, salesChartOptions);

    // ---------------------------
    // - END MONTHLY SALES CHART -
    // ---------------------------

    // -------------
    // - PIE CHART -
    // -------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d');
    var pieChart       = new Chart(pieChartCanvas);
    var PieData        = [
      {
        value    : 700,
        color    : '#f56954',
        highlight: '#f56954',
        label    : 'Chrome'
      },
      {
        value    : 500,
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : 'IE'
      },
      {
        value    : 400,
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : 'FireFox'
      },
      {
        value    : 600,
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : 'Safari'
      },
      {
        value    : 300,
        color    : '#3c8dbc',
        highlight: '#3c8dbc',
        label    : 'Opera'
      },
      {
        value    : 100,
        color    : '#d2d6de',
        highlight: '#d2d6de',
        label    : 'Navigator'
      }
    ];
    var pieOptions     = {
      // Boolean - Whether we should show a stroke on each segment
      segmentShowStroke    : true,
      // String - The colour of each segment stroke
      segmentStrokeColor   : '#fff',
      // Number - The width of each segment stroke
      segmentStrokeWidth   : 1,
      // Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      // Number - Amount of animation steps
      animationSteps       : 100,
      // String - Animation easing effect
      animationEasing      : 'easeOutBounce',
      // Boolean - Whether we animate the rotation of the Doughnut
      animateRotate        : true,
      // Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale         : false,
      // Boolean - whether to make the chart responsive to window resizing
      responsive           : true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio  : false,
      // String - A legend template
      legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
      // String - A tooltip template
      tooltipTemplate      : '<%=value %> <%=label%> users'
    };
    // Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);
    // -----------------
    // - END PIE CHART -
    // -----------------

    /* jVector Maps
     * ------------
     * Create a world map with markers
     */
    $('#world-map-markers').vectorMap({
      map              : 'world_mill_en',
      normalizeFunction: 'polynomial',
      hoverOpacity     : 0.7,
      hoverColor       : false,
      backgroundColor  : 'transparent',
      regionStyle      : {
        initial      : {
          fill            : 'rgba(210, 214, 222, 1)',
          'fill-opacity'  : 1,
          stroke          : 'none',
          'stroke-width'  : 0,
          'stroke-opacity': 1
        },
        hover        : {
          'fill-opacity': 0.7,
          cursor        : 'pointer'
        },
        selected     : {
          fill: 'yellow'
        },
        selectedHover: {}
      },
      markerStyle      : {
        initial: {
          fill  : '#00a65a',
          stroke: '#111'
        }
      },
      markers          : [
        { latLng: [41.90, 12.45], name: 'Vatican City' },
        { latLng: [43.73, 7.41], name: 'Monaco' },
        { latLng: [-0.52, 166.93], name: 'Nauru' },
        { latLng: [-8.51, 179.21], name: 'Tuvalu' },
        { latLng: [43.93, 12.46], name: 'San Marino' },
        { latLng: [47.14, 9.52], name: 'Liechtenstein' },
        { latLng: [7.11, 171.06], name: 'Marshall Islands' },
        { latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis' },
        { latLng: [3.2, 73.22], name: 'Maldives' },
        { latLng: [35.88, 14.5], name: 'Malta' },
        { latLng: [12.05, -61.75], name: 'Grenada' },
        { latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines' },
        { latLng: [13.16, -59.55], name: 'Barbados' },
        { latLng: [17.11, -61.85], name: 'Antigua and Barbuda' },
        { latLng: [-4.61, 55.45], name: 'Seychelles' },
        { latLng: [7.35, 134.46], name: 'Palau' },
        { latLng: [42.5, 1.51], name: 'Andorra' },
        { latLng: [14.01, -60.98], name: 'Saint Lucia' },
        { latLng: [6.91, 158.18], name: 'Federated States of Micronesia' },
        { latLng: [1.3, 103.8], name: 'Singapore' },
        { latLng: [1.46, 173.03], name: 'Kiribati' },
        { latLng: [-21.13, -175.2], name: 'Tonga' },
        { latLng: [15.3, -61.38], name: 'Dominica' },
        { latLng: [-20.2, 57.5], name: 'Mauritius' },
        { latLng: [26.02, 50.55], name: 'Bahrain' },
        { latLng: [0.33, 6.73], name: 'São Tomé and Príncipe' }
      ]
    });

    /* SPARKLINE CHARTS
     * ----------------
     * Create a inline charts with spark line
     */

    // -----------------
    // - SPARKLINE BAR -
    // -----------------
    $('.sparkbar').each(function () {
      var $this = $(this);
      $this.sparkline('html', {
        type    : 'bar',
        height  : $this.data('height') ? $this.data('height') : '30',
        barColor: $this.data('color')
      });
    });

    // -----------------
    // - SPARKLINE PIE -
    // -----------------
    $('.sparkpie').each(function () {
      var $this = $(this);
      $this.sparkline('html', {
        type       : 'pie',
        height     : $this.data('height') ? $this.data('height') : '90',
        sliceColors: $this.data('color')
      });
    });

    // ------------------
    // - SPARKLINE LINE -
    // ------------------
    $('.sparkline').each(function () {
      var $this = $(this);
      $this.sparkline('html', {
        type     : 'line',
        height   : $this.data('height') ? $this.data('height') : '90',
        width    : '100%',
        lineColor: $this.data('linecolor'),
        fillColor: $this.data('fillcolor'),
        spotColor: $this.data('spotcolor')
      });
    });
  });
}

class Page extends React.Component {
  // title = 'The Page Title'
  // static async getInitialProps() {
  //   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  //   const data = await res.json()
  //   console.log(`Show data fetched. Count: ${data.length}`)
  //   return {shows: data}
  // }
  componentDidMount() {
    console.log('componentDidMount');
    // demoContent();
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
    // demoContent();
  }

  render() {

    return (
      <Layout title="Dashboard" tagLine="Control panel">
        <Row>
          <Box small lg="3" xs="6" bg="aqua" ion="bag">
            <BoxHeader>New Orders</BoxHeader>
            <BoxBody>150</BoxBody>
            <BoxFooter>More info</BoxFooter>
          </Box>
          <Box small lg="3" xs="6" bg="green" ion="stats-bars">
            <BoxHeader>Bounce Rate</BoxHeader>
            <BoxBody><Percentage value="53"/></BoxBody>
            <BoxFooter>More info</BoxFooter>
          </Box>
          <Box small lg="3" xs="6" bg="yellow" ion="person-add">
            <BoxHeader>User Registrations</BoxHeader>
            <BoxBody>44</BoxBody>
            <BoxFooter>More info</BoxFooter>
          </Box>
          <Box small lg="3" xs="6" bg="red" ion="pie-graph">
            <BoxHeader>Unique Visitors</BoxHeader>
            <BoxBody>65</BoxBody>
            <BoxFooter>More info</BoxFooter>
          </Box>
        </Row>
        <Row>
          <section class="col-lg-7 connectedSortable">
            <WidgetSales/>
            <WidgetChat/>
            <WidgetToDoList/>
            <WidgetQuickEmail/>
          </section>

          {/* <!-- right col (We are only adding the ID to make the widgets sortable)--> */}
          <section class="col-lg-5 connectedSortable">
            <WidgetVisitors/>
            <WidgetSalesGraph/>
            <WidgetCalendar/>
          </section>
        </Row>
      </Layout>)
  }
}

export default Page
