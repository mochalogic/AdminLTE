import React from 'react'
import Link from 'next/link'
import {Icon} from '../'

import lib from '../lib'

const WidgetUser = () => (
  <div class="user-panel">
    <div class="pull-left image">
      <img src="/adminlte/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image"/>
    </div>
    <div class="pull-left info">
      <p>Alexander Pierce</p>
      <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
    </div>
  </div>
)
const WidgetSearch = () => (
  <form action="#" method="get" class="sidebar-form">
    <div class="input-group">
      <input type="text" name="q" class="form-control" placeholder="Search..."/>
      <span class="input-group-btn">
        <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
        </button>
      </span>
    </div>
  </form>
)

const Menu = ({children, menu}) => {
  const menuTool = (item, index) => <MenuTool {...item} key={index}/>
  const menuItem = (item, index) => (
    <MenuItem {...item} key={index}>
      {item.menuItems && item.menuItems.map(menuItem)}
      {item.menuTools && item.menuTools.map(menuTool)}
    </MenuItem>)

  return <ul class="sidebar-menu" data-widget="tree">{menu ? menu.menuItems.map(menuItem) : children}</ul>
}
const MenuItem = ({children, header = false, selected = false, icon = 'fa-circle-o', title, href}) => {
  if (header) return <li class="header">{title}</li>

  let menuItemClass = [];
  let menuItems = [];
  let menuTools = [];
  let menuToolbox = null;
  let menuTree = null;

  const selectedChildren = (selected, child) => selected
    || (child
      && child.props
      && (child.props.selected
        || (child.props.children
          && child.props.children.reduce(selectedChildren, selected))
      )
    )

  React.Children.forEach(
    children,
    (child) => {
      switch (true) {
        case lib.typeMatch(child, MenuItem):
          menuItems.push(child);
          selected = selectedChildren(selected, child)
          break;
        case lib.typeMatch(child, MenuTool):
          menuTools.push(child);
          break;
      }
    }
  )

  if (selected) menuItemClass.push('active')
  if (icon) icon = <Icon name={icon}/>
  title = <span>{title}</span>

  if (menuItems.length > 0) {
    menuItemClass.push('treeview')

    menuTools.push(<i key="expand-caret" class="fa fa-angle-left pull-right"></i>)
    menuTree = <ul class="treeview-menu">{menuItems}</ul>
  }
  if (menuTools.length > 0) menuToolbox = <span class="pull-right-container">{menuTools.reverse()}</span>

  const menuItem = <a>{icon}{title}{menuToolbox}</a>
  return <li class={menuItemClass.join(' ')}>{(menuItems.length == 0 && href) ? <Link href={href}>{menuItem}</Link> : menuItem}{menuTree}</li>
}
const MenuTool = ({children, label = false, value, bg, context}) => {
  if (label) {
    let labelClass = ['label', 'pull-right'];
    if (bg) labelClass.push(`bg-${bg}`)
    if (context) labelClass.push(`label-${context}`)
    return <small class={labelClass.join(' ')}>{value}</small>
  }
  return children;
}

const baseUrl = '/demo'
const menu = {
  menuItems: [
    {title: 'MAIN NAVIGATION', header: true},
    {title: 'Dashboard', icon: 'fa-dashboard',
      menuItems: [
        {title: 'Dashboard v1',       href: `${baseUrl}/dashboard`, selected: true},
        {title: 'Dashboard v2',       href: `${baseUrl}/dashboard2`}
      ],
      menuTools: []
    },
    {title: 'Layout Options', icon: 'fa-files-o',
      menuItems: [
        {title: 'Top Navigation',     href: `${baseUrl}/layoutTopNav`},
        {title: 'Boxed',              href: `${baseUrl}/layoutBoxed`},
        {title: 'Fixed',              href: `${baseUrl}/layoutFixed`},
        {title: 'Collapsed Sidebar',  href: `${baseUrl}/layoutCollapsedSidebar`}
      ],
      menuTools: [
        {label: true, value: '4', context: 'primary'}
      ]
    },
    {title: 'Widgets', icon: 'fa-th', href: `${baseUrl}/widgets`,
      menuItems: [],
      menuTools: [
        {label: true, value: 'new', bg: 'green'}
      ]
    },
    {title: 'Charts', icon: 'fa-pie-chart',   href: null,
      menuItems: [
        {title: 'ChartJS',            href: `${baseUrl}/chartChartJs`},
        {title: 'Morris',             href: `${baseUrl}/chartMorris`},
        {title: 'Flot',               href: `${baseUrl}/chartFlot`},
        {title: 'Inline charts',      href: `${baseUrl}/chartInline`}
      ],
      menuTools: []
    },
    {title: 'UI Elements', icon: 'fa-laptop', href: null,
      menuItems: [
        {title: 'General',            href:`${baseUrl}/uiGeneral`},
        {title: 'Icons',              href:`${baseUrl}/uiIcons`},
        {title: 'Buttons',            href:`${baseUrl}/uiButtons`},
        {title: 'Sliders',            href:`${baseUrl}/uiSliders`},
        {title: 'Timeline',            href:`${baseUrl}/uiTimeline`},
        {title: 'Modals',             href:`${baseUrl}/uiModals`}
      ],
      menuTools: []
    },
    {title: 'Forms', icon: 'fa-edit',         href: null,
      menuItems: [
        {title: 'General Elements',   href:`${baseUrl}/formsGeneral`},
        {title: 'Advanced Elements',  href:`${baseUrl}/formsAdvanced`},
        {title: 'Editors',            href:`${baseUrl}/formsEditors`}
      ],
      menuTools: []
    },
    {title: 'Tables', icon: 'fa-table',       href: null,
      menuItems: [
        {title: 'Simple tables',      href: `${baseUrl}/tableSimple`},
        {title: 'Data tables',        href: `${baseUrl}/tableData`},
      ],
      menuTools: []
    },
    {title: 'Calendar', icon: 'fa-calendar',  href: `${baseUrl}/calendar`,
      menuItems: [],
      menuTools: [
        {label: true, value: 17, bg: 'blue'},
        {label: true, value: 3, bg: 'red'}
      ]
    },
    {title: 'Mailbox', icon: 'fa-envelope',   href: `${baseUrl}/mailbox`,
      menuItems: [],
      menuTools: [
        {label: true, value: 5, bg: 'red'},
        {label: true, value: 16, bg: 'green'},
        {label: true, value: 12, bg: 'yellow'}
      ]
    },
    {title: 'Examples', icon: 'fa-folder',    href: null,
      menuItems: [
        {title: 'Invoice',            href: `${baseUrl}/exampleInvoice`},
        {title: 'Profile',            href: `${baseUrl}/exampleProfile`},
        {title: 'Login',              href: `${baseUrl}/exampleLogin`},
        {title: 'Register',           href: `${baseUrl}/exampleRegister`},
        {title: 'Lockscreen',         href: `${baseUrl}/exampleLockscreen`},
        {title: '404 Error',          href: `${baseUrl}/example404`},
        {title: '500 Error',          href: `${baseUrl}/example500`},
        {title: 'Blank Page',         href: `${baseUrl}/exampleBlank`},
        {title: 'Pace Page',          href: `${baseUrl}/examplePace`}
      ],
      menuTools: []
    },
    {title: 'Multilevel', icon: 'fa-share', href: null,
      menuItems: [
        {title: 'Level One'},
        {title: 'Level One',
          menuItems: [
            {title: 'Level Two'},
            {title: 'Level Two',
              menuItems: [
                {title: 'Level Three'},
                {title: 'Level Three'}
              ]
            }
          ]
        },
        {title: 'Level One'}
      ],
      menuTools: []
    },
    {title: 'Documentation', icon: 'fa-book', href: 'https://adminlte.io/docs',
      menuItems: [],
      menuTools: []
    },
    {title: 'LABLES', header: true},
    {title: 'Important', icon: 'fa-circle-o text-red', href: null,
      menuItems: [],
      menuTools: []
    },
    {title: 'Warning', icon: 'fa-circle-o text-yellow', href: null,
      menuItems: [],
      menuTools: []
    },
    {title: 'Information', icon: 'fa-circle-o text-aqua', href: null,
      menuItems: [],
      menuTools: []
    },
    // {title: '', icon: null, href: null,
    //   menuItems: [],
    //   menuTools: []
    // },
  ]
}

// const menuItemHeader = (title) => ({title, header: true})
// const menuItem = (title, icon = null, href = null) => ({title, icon, href, menuItems: [], menuTools: []})

const SidebarLeft = () => (
  <aside class="main-sidebar">
    <section class="sidebar">
      <WidgetUser/>
      <WidgetSearch/>
      <Menu menu={menu}/>
      {/*
      <Menu>
        <MenuItem header title="MAIN NAVIGATION"/>
        <MenuItem title="Dashboard" icon="fa-dashboard">
          <MenuItem title="Dashboard v1" href={`${baseUrl}/dashboard`} selected/>
          <MenuItem title="Dashboard v2" href={`${baseUrl}/dashboard2`}/>
        </MenuItem>
        <MenuItem title="Layout Options" icon="fa-files-o">
          <MenuItem title="Top Navigation" href={`${baseUrl}/layoutTopNav`}/>
          <MenuItem title="Boxed" href={`${baseUrl}/layoutBoxed`}/>
          <MenuItem title="Fixed" href={`${baseUrl}/layoutFixed`}/>
          <MenuItem title="Collapsed Sidebar" href={`${baseUrl}/layoutCollapsedSidebar`}/>
          <MenuTool label value="4" context="primary"/>
        </MenuItem>
        <MenuItem title="Widgets" href={`${baseUrl}/widgets`} icon="fa-th">
          <MenuTool label value="new" bg="green"/>
        </MenuItem>
        <MenuItem title="Charts" icon="fa-pie-chart">
          <MenuItem title="ChartJS" href={`${baseUrl}/chartChartJs`}/>
          <MenuItem title="Morris" href={`${baseUrl}/chartMorris`}/>
          <MenuItem title="Flot" href={`${baseUrl}/chartFlot`}/>
          <MenuItem title="Inline charts" href={`${baseUrl}/chartInline`}/>
        </MenuItem>
        <MenuItem title="UI Elements" icon="fa-laptop">
          <MenuItem title="General" href={`${baseUrl}/uiGeneral`}/>
          <MenuItem title="Icons" href={`${baseUrl}/uiIcons`}/>
          <MenuItem title="Buttons" href={`${baseUrl}/uiButtons`}/>
          <MenuItem title="Sliders" href={`${baseUrl}/uiSliders`}/>
          <MenuItem title="Timeline" href={`${baseUrl}/uiTimeline`}/>
          <MenuItem title="Modals" href={`${baseUrl}/uiModals`}/>
        </MenuItem>
        <MenuItem title="Forms" icon="fa-edit">
          <MenuItem title="General Elements" href={`${baseUrl}/formsGeneral`}/>
          <MenuItem title="Advanced Elements" href={`${baseUrl}/formsAdvanced`}/>
          <MenuItem title="Editors" href={`${baseUrl}/formsEditors`}/>
        </MenuItem>
        <MenuItem title="Tables" icon="fa-table">
          <MenuItem title="Simple tables" href={`${baseUrl}/tableSimple`}/>
          <MenuItem title="Data tables" href={`${baseUrl}/tableData`}/>
        </MenuItem>
        <MenuItem title="Calendar" href={`${baseUrl}/calendar`} icon="fa-calendar">
          <MenuTool label value="17" bg="blue"/>
          <MenuTool label value="3" bg="red"/>
        </MenuItem>
        <MenuItem title="Mailbox" href={`${baseUrl}/mailbox`} icon="fa-envelope">
          <MenuTool label value="5" bg="red"/>
          <MenuTool label value="16" bg="green"/>
          <MenuTool label value="12" bg="yellow"/>
        </MenuItem>
        <MenuItem title="Examples" href={`${baseUrl}/asdf`} icon="fa-folder">
          <MenuItem title="Invoice" href={`${baseUrl}/exampleInvoice`}/>
          <MenuItem title="Profile" href={`${baseUrl}/exampleProfile`}/>
          <MenuItem title="Login" href={`${baseUrl}/exampleLogin`}/>
          <MenuItem title="Register" href={`${baseUrl}/exampleRegister`}/>
          <MenuItem title="Lockscreen" href={`${baseUrl}/exampleLockscreen`}/>
          <MenuItem title="404 Error" href={`${baseUrl}/example404`}/>
          <MenuItem title="500 Error" href={`${baseUrl}/example500`}/>
          <MenuItem title="Blank Page" href={`${baseUrl}/exampleBlank`}/>
          <MenuItem title="Pace Page" href={`${baseUrl}/examplePace`}/>
        </MenuItem>
        <MenuItem title="Multilevel" icon="fa-share">
          <MenuItem title="Level One"/>
          <MenuItem title="Level One">
            <MenuItem title="Level Two"/>
            <MenuItem title="Level Two">
              <MenuItem title="Level Three"/>
              <MenuItem title="Level Three"/>
            </MenuItem>
          </MenuItem>
          <MenuItem title="Level One"/>
        </MenuItem>
        <MenuItem title="Documentation" href="https://adminlte.io/docs" icon="fa-book"></MenuItem>
        <MenuItem header title="LABELS"/>
        <MenuItem title="Important" icon="fa-circle-o text-red"></MenuItem>
        <MenuItem title="Warning" icon="fa-circle-o text-yellow"></MenuItem>
        <MenuItem title="Information" icon="fa-circle-o text-aqua"></MenuItem>
      </Menu>
      */}
    </section>
  </aside>
)

export default SidebarLeft
