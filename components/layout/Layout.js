import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {Icon} from '../'

import Header from './Header.js'
import SidebarLeft from './SidebarLeft.js'
import SidebarRight from './SidebarRight.js'
import Footer from './Footer.js'

import withNProgress from 'next-nprogress';
import NProgressStyles from 'next-nprogress/styles';
import NProgress from 'nprogress';

import axios from 'axios'

const axiosRegisterNProgress = () => {
  const calculatePercentage = (loaded, total) => (Math.floor(loaded * 1.0) / total)

  axios.defaults.onDownloadProgress = e => {
    const percentage = calculatePercentage(e.loaded, e.total)
    NProgress.set(percentage)
  }

  axios.interceptors.response.use(response => {
    NProgress.done(true)
    return response
  })
}


class Layout extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: true
    }
  }
  componentDidMount()  {
    axiosRegisterNProgress()

    this.legacyCode()
    this.setState({...this.state, loading: false})
  }
  componentDidUpdate() {
    this.legacyCode()
  }
  legacyCode() {
    $.widget.bridge('uibutton', $.ui.button);
  }
  render() {
    const title = this.props.title
    const tagLine = this.props.tagLine
    const children = this.props.children
    // console.log({f: 'Layout.render', props: this.props});

    const AdminLteHead = (
      <>
                                <link rel="stylesheet" href="/adminlte/node_modules/bootstrap/dist/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/font-awesome/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/Ionicons/css/ionicons.min.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/morris.js/morris.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/jvectormap/jquery-jvectormap.css"/>
                                <link rel="stylesheet" href="/adminlte/node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css"/>
                                <link rel="stylesheet" href="/adminlte/node_modules/bootstrap-daterangepicker/daterangepicker.css"/>
        <link rel="stylesheet" href="/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css"/>

        {/* Form -> Advanced */}
                                <link rel="stylesheet" href="/adminlte/node_modules/icheck-bootstrap/icheck-bootstrap.min.css"/>
                                <link rel="stylesheet" href="/adminlte/node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css"/>
                                <link rel="stylesheet" href="/adminlte/node_modules/bootstrap-timepicker/css/bootstrap-timepicker.min.css"/>
                                <link rel="stylesheet" href="/adminlte/node_modules/select2/dist/css/select2.min.css"/>
        {/* Form -> Advanced */}

        <link rel="stylesheet" href="/adminlte/dist/css/AdminLTE.min.css"/>
        <link rel="stylesheet" href="/adminlte/dist/css/skins/_all-skins.min.css"/>

        {/* <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]--> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"/>
      </>)

    const AdminLteFoot = (
      <>
        <script src="/adminlte/bower_components/jquery/dist/jquery.min.js"></script>
        <script src="/adminlte/bower_components/jquery-ui/jquery-ui.min.js"></script>
        {/* <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip --> */}
        {/* <script>$.widget.bridge('uibutton', $.ui.button);</script> */}
                                <script src="/adminlte/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/adminlte/bower_components/raphael/raphael.min.js"></script>
        <script src="/adminlte/bower_components/morris.js/morris.min.js"></script>
        <script src="/adminlte/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
        <script src="/adminlte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
        <script src="/adminlte/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
        <script src="/adminlte/bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
        <script src="/adminlte/bower_components/moment/min/moment.min.js"></script>
                                <script src="/adminlte/node_modules/bootstrap-daterangepicker/daterangepicker.js"></script>
                                <script src="/adminlte/node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
        <script src="/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
        <script src="/adminlte/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
        <script src="/adminlte/bower_components/fastclick/lib/fastclick.js"></script>

        {/* Form -> Advanced */}
                                <script src="../adminlte/node_modules/select2/dist/js/select2.full.min.js"></script>
                                <script src="../adminlte/node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js"></script>
                                {/* <script src="../adminlte/plugins/input-mask/jquery.inputmask.js"></script> */}
                                {/* <script src="../adminlte/plugins/input-mask/jquery.inputmask.date.extensions.js"></script> */}
                                {/* <script src="../adminlte/plugins/input-mask/jquery.inputmask.extensions.js"></script> */}
                                <script src="../adminlte/node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js"></script>
                                <script src="../adminlte/node_modules/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
        {/* Form -> Advanced */}

        {/* <script src="/adminlte/dist/js/adminlte.min.js"></script> */}
        <script src="/adminlte/build/js/BoxRefresh.js"></script>
        <script src="/adminlte/build/js/BoxWidget.js"></script>
        <script src="/adminlte/build/js/ControlSidebar.js"></script>
        <script src="/adminlte/build/js/DirectChat.js"></script>
        <script src="/adminlte/build/js/Layout.js"></script>
        <script src="/adminlte/build/js/PushMenu.js"></script>
        <script src="/adminlte/build/js/TodoList.js"></script>
        <script src="/adminlte/build/js/Tree.js"></script>

        <script src="/adminlte/dist/js/demo.js"></script>
      </>)

    const Loading = (
      <div class="loading">
        <style jsx global>{`
          .loading {
            height:100%;
            background:black;
            float:left;
            top:0;
            left:0;
            display:table;
            position:absolute;
            z-index:10000;
            width:100%;
            opacity:.25;
            text-align:center;
            vertical-align:middle;
            color: white;
            font-size: 100px;
          }
          .loadingSpinner {
            vertical-align: middle;
            display: table-cell;
            animation-name: spin;
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }
          @keyframes spin {
            from {
              transform:rotate(0deg);
            }
            to {
              transform:rotate(360deg);
            }
          }
        `}</style>
        <Icon name="fa-spinner" class="loadingSpinner"/>
      </div>)

    const Wrapper = (
      <div class="wrapper">
        <Header/>
        <SidebarLeft/>
        <div class="content-wrapper">
          <section class="content-header">
            <h1>{title}<small>{tagLine}</small></h1>
            <ol class="breadcrumb">
              <li>
                <Link href="/demo">
                  <a><Icon name="fa-dashboard"/>Home</a>
                </Link>
              </li>
              <li class="active">{title}</li>
            </ol>
          </section>
          <section class="content">
            {children}
          </section>
        </div>
        <Footer/>
        <SidebarRight/>
      </div>)

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
          {AdminLteHead}
          {AdminLteFoot}
        </Head>
        <NProgressStyles color="#FF0000" spinner={true} />
        {this.state.loading ? Loading : Wrapper}
      </>
    )
  }
}

const msDelay = 300; // default is 300
export default withNProgress(msDelay)(Layout);
// export default Layout
