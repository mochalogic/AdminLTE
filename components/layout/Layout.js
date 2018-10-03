import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {Icon} from '../'

import Header from './Header.js'
import SidebarLeft from './SidebarLeft.js'
import SidebarRight from './SidebarRight.js'
import Footer from './Footer.js'

import withNProgress from "next-nprogress";
import NProgressStyles from "next-nprogress/styles";

class Layout extends React.Component {
  componentDidMount()  {
    this.legacyCode()
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
        <link rel="stylesheet" href="/adminlte/bower_components/bootstrap/dist/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/font-awesome/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/Ionicons/css/ionicons.min.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/morris.js/morris.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/jvectormap/jquery-jvectormap.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.css"/>
        <link rel="stylesheet" href="/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css"/>

        {/* Form -> Advanced */}
        <link rel="stylesheet" href="/adminlte/plugins/iCheck/all.css"/>
        <link rel="stylesheet" href="/adminlte/bower_components/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css"/>
        <link rel="stylesheet" href="/adminlte/plugins/timepicker/bootstrap-timepicker.min.css"/>
        {/* <link rel="stylesheet" href="/adminlte/bower_components/select2/dist/css/select2.min.css"/> */}
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
        <script src="/adminlte/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/adminlte/bower_components/raphael/raphael.min.js"></script>
        <script src="/adminlte/bower_components/morris.js/morris.min.js"></script>
        <script src="/adminlte/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
        <script src="/adminlte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
        <script src="/adminlte/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
        <script src="/adminlte/bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
        <script src="/adminlte/bower_components/moment/min/moment.min.js"></script>
        <script src="/adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
        <script src="/adminlte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
        <script src="/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
        <script src="/adminlte/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
        <script src="/adminlte/bower_components/fastclick/lib/fastclick.js"></script>

        {/* Form -> Advanced */}
        {/* <script src="../adminlte/bower_components/select2/dist/js/select2.full.min.js"></script> */}
        <script src="../adminlte/node_modules/select2/dist/js/select2.full.min.js"></script>
        <script src="../adminlte/plugins/input-mask/jquery.inputmask.js"></script>
        <script src="../adminlte/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
        <script src="../adminlte/plugins/input-mask/jquery.inputmask.extensions.js"></script>
        <script src="../adminlte/plugins/iCheck/icheck.min.js"></script>
        <script src="../adminlte/bower_components/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js"></script>
        <script src="../adminlte/plugins/timepicker/bootstrap-timepicker.min.js"></script>
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
        </div>
      </>
    )
  }
}

const msDelay = 300; // default is 300
export default withNProgress(msDelay)(Layout);
// export default Layout
