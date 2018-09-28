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
  Percentage,
  Icon
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

    // Make the dashboard widgets sortable Using jquery UI
    $('.connectedSortable').sortable({
      placeholder         : 'sort-highlight',
      connectWith         : '.connectedSortable',
      handle              : '.box-header, .nav-tabs',
      forcePlaceholderSize: true,
      zIndex              : 999999
    });
    $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

    // jQuery UI sortable for the todo list
    $('.todo-list').sortable({
      placeholder         : 'sort-highlight',
      handle              : '.handle',
      forcePlaceholderSize: true,
      zIndex              : 999999
    });

    // bootstrap WYSIHTML5 - text editor
    $('.textarea').wysihtml5();

    $('.daterange').daterangepicker(
      {
        ranges   : {
          'Today'       : [moment(), moment()],
          'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month'  : [moment().startOf('month'), moment().endOf('month')],
          'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate  : moment()
      },
      function (start, end) {
        window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      });

    /* jQueryKnob */
    $('.knob').knob();

    // jvectormap data
    var visitorsData = {
      US: 398, // USA
      SA: 400, // Saudi Arabia
      CA: 1000, // Canada
      DE: 500, // Germany
      FR: 760, // France
      CN: 300, // China
      AU: 700, // Australia
      BR: 600, // Brazil
      IN: 800, // India
      GB: 320, // Great Britain
      RU: 3000 // Russia
    };

    // World map by jvectormap
    $('#world-map').vectorMap({
      map              : 'world_mill_en',
      backgroundColor  : 'transparent',
      regionStyle      : {
        initial: {
          fill            : '#e4e4e4',
          'fill-opacity'  : 1,
          stroke          : 'none',
          'stroke-width'  : 0,
          'stroke-opacity': 1
        }
      },
      series           : {
        regions: [
          {
            values           : visitorsData,
            scale            : ['#92c1dc', '#ebf4f9'],
            normalizeFunction: 'polynomial'
          }
        ]
      },
      onRegionLabelShow: function (e, el, code) {
        if (typeof visitorsData[code] != 'undefined')
          el.html(el.html() + ': ' + visitorsData[code] + ' new visitors');
      }
    });

    // Sparkline charts
    var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
    $('#sparkline-1').sparkline(myvalues, {
      type     : 'line',
      lineColor: '#92c1dc',
      fillColor: '#ebf4f9',
      height   : '50',
      width    : '80'
    });
    myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
    $('#sparkline-2').sparkline(myvalues, {
      type     : 'line',
      lineColor: '#92c1dc',
      fillColor: '#ebf4f9',
      height   : '50',
      width    : '80'
    });
    myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
    $('#sparkline-3').sparkline(myvalues, {
      type     : 'line',
      lineColor: '#92c1dc',
      fillColor: '#ebf4f9',
      height   : '50',
      width    : '80'
    });

    // The Calender
    $('#calendar').datepicker();

    // SLIMSCROLL FOR CHAT WIDGET
    $('#chat-box').slimScroll({
      height: '250px'
    });

    /* Morris.js Charts */
    // Sales chart
    var area = new Morris.Area({
      element   : 'revenue-chart',
      resize    : true,
      data      : [
        { y: '2011 Q1', item1: 2666, item2: 2666 },
        { y: '2011 Q2', item1: 2778, item2: 2294 },
        { y: '2011 Q3', item1: 4912, item2: 1969 },
        { y: '2011 Q4', item1: 3767, item2: 3597 },
        { y: '2012 Q1', item1: 6810, item2: 1914 },
        { y: '2012 Q2', item1: 5670, item2: 4293 },
        { y: '2012 Q3', item1: 4820, item2: 3795 },
        { y: '2012 Q4', item1: 15073, item2: 5967 },
        { y: '2013 Q1', item1: 10687, item2: 4460 },
        { y: '2013 Q2', item1: 8432, item2: 5713 }
      ],
      xkey      : 'y',
      ykeys     : ['item1', 'item2'],
      labels    : ['Item 1', 'Item 2'],
      lineColors: ['#a0d0e0', '#3c8dbc'],
      hideHover : 'auto'
    });
    var line = new Morris.Line({
      element          : 'line-chart',
      resize           : true,
      data             : [
        { y: '2011 Q1', item1: 2666 },
        { y: '2011 Q2', item1: 2778 },
        { y: '2011 Q3', item1: 4912 },
        { y: '2011 Q4', item1: 3767 },
        { y: '2012 Q1', item1: 6810 },
        { y: '2012 Q2', item1: 5670 },
        { y: '2012 Q3', item1: 4820 },
        { y: '2012 Q4', item1: 15073 },
        { y: '2013 Q1', item1: 10687 },
        { y: '2013 Q2', item1: 8432 }
      ],
      xkey             : 'y',
      ykeys            : ['item1'],
      labels           : ['Item 1'],
      lineColors       : ['#efefef'],
      lineWidth        : 2,
      hideHover        : 'auto',
      gridTextColor    : '#fff',
      gridStrokeWidth  : 0.4,
      pointSize        : 4,
      pointStrokeColors: ['#efefef'],
      gridLineColor    : '#efefef',
      gridTextFamily   : 'Open Sans',
      gridTextSize     : 10
    });

    // Donut Chart
    var donut = new Morris.Donut({
      element  : 'sales-chart',
      resize   : true,
      colors   : ['#3c8dbc', '#f56954', '#00a65a'],
      data     : [
        { label: 'Download Sales', value: 12 },
        { label: 'In-Store Sales', value: 30 },
        { label: 'Mail-Order Sales', value: 20 }
      ],
      hideHover: 'auto'
    });

    // Fix for charts under tabs
    $('.box ul.nav a').on('shown.bs.tab', function () {
      area.redraw();
      donut.redraw();
      line.redraw();
    });

    /* The todo list plugin */
    $('.todo-list').todoList({
      onCheck  : function () {
        window.console.log($(this), 'The element has been checked');
      },
      onUnCheck: function () {
        window.console.log($(this), 'The element has been unchecked');
      }
    });
  });
}

class Page extends React.Component {
  title = 'The Page Title'
  // static async getInitialProps() {
  //   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  //   const data = await res.json()
  //   console.log(`Show data fetched. Count: ${data.length}`)
  //   return {shows: data}
  // }
  componentDidMount() {
    console.log(`componentDidMount (${this.title})`);
    demoContent();
  }
  componentDidUpdate() {
    console.log(`componentDidUpdate (${this.title})`);
    demoContent();
  }

  render() {

    return (
      <Layout title="Dashboard" tagLine="Control panel">
        <Row>
          <Box small lg="3" xs="6" bg="aqua">
            <Icon name="ion-bag"/>
            <BoxHeader title="New Orders"/>
            <BoxBody>150</BoxBody>
            <BoxFooter>More info</BoxFooter>
          </Box>
          <Box small lg="3" xs="6" bg="green">
            <Icon name="ion-stats-bars"/>
            <BoxHeader title="Bounce Rate"/>
            <BoxBody><Percentage value="53"/></BoxBody>
            <BoxFooter>More info</BoxFooter>
          </Box>
          <Box small lg="3" xs="6" bg="yellow">
            <Icon name="ion-person-add"/>
            <BoxHeader title="User Registrations"/>
            <BoxBody>44</BoxBody>
            <BoxFooter>More info</BoxFooter>
          </Box>
          <Box small lg="3" xs="6" bg="red">
            <Icon name="ion-pie-graph"/>
            <BoxHeader title="Unique Visitors"/>
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
