import React, {Component} from 'react'
import Layout from '../../components/layout/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import {
  Row,
  Col,
  Box,
  BoxHeader,
  BoxTool,
  BoxBody,
  BoxProgress,
  BoxFooter,
  Percentage,
  Image,
  Badge,
  Icon
} from '../../components'

const imgRoot = '/adminlte/'

// const clickHandler = (t) => {
//   console.log({t});
// }
// let magic;
// const changHandler = (t) => {
//   console.log({t, target: t.target, currentTarget: t.currentTarget, value: t.target.value});
//   magic = t.target.value;
// }
// <input type="button" onClick={(t) => clickHandler(t, 'magic')} value="click me"></input>
// <input type="text" onChange={changHandler} value={magic}/>


// Widgets
const DirectChat = ({context, className, title = 'Direct Chat', ...props}) => {
  let badgeBg = ''

  context = context || 'default'

  switch (context) {
    case 'primary':
      badgeBg = 'light-blue'
      break;
    case 'success':
      badgeBg = 'green'
      break;
    case 'warning':
      badgeBg = 'yellow'
      break;
    case 'danger':
      badgeBg = 'red'
      break;
  }

  className = className ? [className] : []
  className.push('direct-chat')
  className.push(`direct-chat-${context}`)

  return (
    <Box context={context} {...props} class={className.join(' ')} collapsable removable>
      <BoxHeader bordered title={title}/>
      <BoxTool><Badge tooltip="3 New Messages" bg={badgeBg} value="3"/></BoxTool>
      <BoxTool><button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle"><i class="fa fa-comments"></i></button></BoxTool>
      <BoxBody>
        <DirectChatMessages>
          <DirectChatMessage self name="Alexander Pierce" timestamp="23 Jan 2:00 pm" image="dist/img/user1-128x128.jpg">Is this template really for free? That's unbelievable!</DirectChatMessage>
          <DirectChatMessage      name="Sarah Bullock"    timestamp="23 Jan 2:05 pm" image="dist/img/user3-128x128.jpg" message="You better believe it!"/>
        </DirectChatMessages>
        <DirectChatContacts/>
      </BoxBody>
      <BoxFooter>
        <form action="#" method="post">
          <div class="input-group">
            <input type="text" name="message" placeholder="Type Message ..." class="form-control"/>
            <span class="input-group-btn">
              <button type="submit" class={`btn btn-${context} btn-flat`}>Send</button>
            </span>
          </div>
        </form>
      </BoxFooter>
    </Box>)
}
const DirectChatMessages = ({children, message, ...props}) => <div class="direct-chat-messages">{message || children}</div>
const DirectChatMessage = ({children, self, name, timestamp, image, message, ...props}) => {
  const directChatMessageClass = self ? "direct-chat-msg" : "direct-chat-msg right"
  const directChatNameClass = self ? "direct-chat-name pull-left" : "direct-chat-name pull-right"
  const directChatTimestampClass = self ? "direct-chat-timestamp pull-right" : "direct-chat-timestamp pull-left"

  if (!message) message = children

  return (
    <div class={directChatMessageClass}>
      <div class="direct-chat-info clearfix">
        <span class={directChatNameClass}>{name}</span>
        <span class={directChatTimestampClass}>{timestamp}</span>
      </div>
      <Image class="direct-chat-img" src={image} title="Message User Image"/>
      <div class="direct-chat-text">{message}</div>
    </div>)
}
const DirectChatContacts = ({children}) => (
  <div class="direct-chat-contacts">
    <ul class="contacts-list">
      <li>
        <a href="#">
          <Image class="contacts-list-img" src="dist/img/user1-128x128.jpg" title="User Image"/>
          <div class="contacts-list-info">
            <span class="contacts-list-name">
              Count Dracula
              <small class="contacts-list-date pull-right">2/28/2015</small>
            </span>
            <span class="contacts-list-msg">How have you been? I was...</span>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <Image class="contacts-list-img" src="dist/img/user3-128x128.jpg" title="User Image"/>
          <div class="contacts-list-info">
            <span class="contacts-list-name">
              Sarah Bullock
              <small class="contacts-list-date pull-right">2/28/2015</small>
            </span>
            <span class="contacts-list-msg">How have you been? I was...</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
)

const WidgetSocial = ({children, title, tagLine, image, className, bg, background, ...props}) => { // ???Widget-User???
  className = className ? [className] : []
  className.push('widget-user')

  const headerClassName = ['widget-user-header']
  if (bg) headerClassName.push(`bg-${bg}`)

  if (background) background = {background: `url('${imgRoot + background}') center center`}

  return (
    <Box widget class={className.join(' ')} {...props}>
      <BoxBody class="no-padding">
        <div class={headerClassName.join(' ')} style={background}>
          <h3 class="widget-user-username">{title}</h3>
          <h5 class="widget-user-desc">{tagLine}</h5>
        </div>
      </BoxBody>
      <BoxBody>
        <div class="widget-user-image"><Image class="img-circle" src={image} title={title}/></div>
      </BoxBody>
      <BoxBody>{children}</BoxBody>
    </Box>
  )
}
const WidgetSocial2 = ({children, title, tagLine, image, className, bg, ...props}) => { // ???Widget-User-2???
  className = className ? [className] : []
  className.push('widget-user-2')

  const headerClassName = ['widget-user-header']
  if (bg) headerClassName.push(`bg-${bg}`)

  return (
    <Box widget class={className.join(' ')} {...props}>
      <BoxBody class="no-padding">
        <div class={headerClassName.join(' ')}>
          <div class="widget-user-image"><Image class="img-circle" src={image} title={title}/></div>
          <h3 class="widget-user-username">{title}</h3>
          <h5 class="widget-user-desc">{tagLine}</h5>
        </div>
      </BoxBody>
      <BoxBody class="no-padding">{children}</BoxBody>
    </Box>
  )
}

const PostBody = ({children, likes, comments, ...props}) => <>{children}</>
const PostComment = ({children, title, timestamp, image, value, ...props}) => (
  <div class="box-comment">
    <Image class="img-circle img-sm" src={image} alt={title}/>
    <div class="comment-text">
      <span class="username">
        {title}
        <span class="text-muted pull-right">{timestamp}</span>
      </span>
      {value || children}
    </div>
  </div>)
const WidgetPost = ({children, postBody, postComments, ...props}) => {
  const postCommentsLength = (postComments && postComments.props.children && postComments.props.children.length) || 0

  return (
    <Box {...props} class="box-widget" collapsable removable>
      <BoxHeader bordered>
        <div class="user-block">
          <Image class="img-circle" src="dist/img/user1-128x128.jpg" title="User Image"/>
          <span class="username"><a href="#">Jonathan Burke Jr.</a></span>
          <span class="description">Shared publicly - 7:30 PM Today</span>
        </div>
      </BoxHeader>
      <BoxTool><button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="Mark as read"><Icon name="fa-circle-o"/></button></BoxTool>
      <BoxBody>
        {postBody}
        <button type="button" class="btn btn-default btn-xs"><Icon name="fa-share"/> Share</button>
        <button type="button" class="btn btn-default btn-xs"><Icon name="fa-thumbs-o-up"/> Like</button>
        <span class="pull-right text-muted">{postBody.props.likes || 0} likes - {postCommentsLength} comments</span>
      </BoxBody>
      <BoxBody class="box-comments">{postComments}</BoxBody>
      <BoxFooter>
        <form action="#" method="post">
          <Image class="img-responsive img-circle img-sm" src="dist/img/user4-128x128.jpg" title="Alt Text"/>
          <div class="img-push">{/* .img-push is used to add margin to elements next to floating images --> */}
            <input type="text" class="form-control input-sm" placeholder="Press enter to post comment"/>
          </div>
        </form>
      </BoxFooter>
    </Box>)
}


// Page Widgets
const BoxInfos = () => (
  <Row>
    <Box info md="3" sm="6" xs="12">
      <Icon name="fa-envelope-o" bg="aqua"/>
      <BoxHeader title="Messages"/>
      <BoxBody>1,410</BoxBody>
    </Box>
    <Box info md="3" sm="6" xs="12">
      <Icon name="fa-flag-o" bg="green"/>
      <BoxHeader title="Bookmarks"/>
      <BoxBody>410</BoxBody>
    </Box>
    <Box info md="3" sm="6" xs="12">
      <Icon name="fa-files-o" bg="yellow"/>
      <BoxHeader title="Uploads"/>
      <BoxBody>13,648</BoxBody>
    </Box>
    <Box info md="3" sm="6" xs="12">
      <Icon name="fa-star-o" bg="red"/>
      <BoxHeader title="Likes"/>
      <BoxBody>93,139</BoxBody>
    </Box>
  </Row>)

const BoxInfosBg = () => (
  <Row>
    <Box info md="3" sm="6" xs="12" bg="aqua">
      <Icon name="fa-bookmark-o"/>
      <BoxHeader title="Bookmarks"/>
      <BoxBody>41,410</BoxBody>
      <BoxProgress value="70" description="70% Increase in 30 Days"/>
    </Box>
    <Box info md="3" sm="6" xs="12" bg="green">
      <Icon name="fa-thumbs-o-up"/>
      <BoxHeader title="Likes"/>
      <BoxBody>41,410</BoxBody>
      <BoxProgress value="10" description="10% Increase in 30 Days"/>
    </Box>
    <Box info md="3" sm="6" xs="12" bg="yellow">
      <Icon name="fa-calendar"/>
      <BoxHeader title="Events"/>
      <BoxBody>41,410</BoxBody>
      <BoxProgress value="90" description="90% Increase in 30 Days"/>
    </Box>
    <Box info md="3" sm="6" xs="12" bg="red">
      <Icon name="fa-comments-o"/>
      <BoxHeader title="Comments"/>
      <BoxBody>41,410</BoxBody>
      <BoxProgress value="30" description="30% Increase in 30 Days"/>
    </Box>
  </Row>)

const BoxSmalls = () => (
  <Row>
    <Box small lg="3" xs="6" bg="aqua">
      <Icon name="fa-shopping-cart"/>
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
  </Row>)

const BoxBehaviors = () => (
  <Row>
    <Box md="3" context="default" collapsable collapsed>
      <BoxHeader bordered title="Expandable"/>
      <BoxBody>The body of the box</BoxBody>
    </Box>
    <Box md="3" context="success" removable>
      <BoxHeader bordered title="Removable"/>
      <BoxBody>The body of the box</BoxBody>
    </Box>
    <Box md="3" context="warning" collapsable removable>
      <BoxHeader bordered title="Collapsable"/>
      <BoxBody>The body of the box</BoxBody>
    </Box>
    <Box md="3" context="danger" loading>
      <BoxHeader bordered title="Loading state"/>
      <BoxBody>The body of the box</BoxBody>
    </Box>
  </Row>)

const BoxBehaviorsSolid = () => (
  <Row>
    <Box md="3" context="default" solid collapsable collapsed>
      <BoxHeader title="Expandable"/>
      <BoxBody>The body of the box</BoxBody>
    </Box>
    <Box md="3" context="success" solid removable>
      <BoxHeader title="Removable"/>
      <BoxBody>The body of the box</BoxBody>
    </Box>
    <Box md="3" context="warning" solid collapsable removable>
      <BoxHeader title="Collapsable"/>
      <BoxBody>The body of the box</BoxBody>
    </Box>
    <Box md="3" context="danger" solid loading>
      <BoxHeader title="Loading state"/>
      <BoxBody>The body of the box</BoxBody>
    </Box>
  </Row>)

const BoxDirectChats = () => (
  <Row>
    <DirectChat md="3" context="primary"/>
    <DirectChat md="3" context="success"/>
    <DirectChat md="3" context="warning"/>
    <DirectChat md="3" context="danger"/>
  </Row>)

const WidgetSocials = () => (
  <Row>
    <WidgetSocial2 md="4" title="Nadia Carmichael" tagLine="Lead Developer" image="dist/img/user7-128x128.jpg" bg="yellow">
      <ul class="nav nav-stacked">
        <li><a href="#">Projects <Badge bg="blue" class="pull-right" value="31"/></a></li>
        <li><a href="#">Tasks <Badge bg="aqua" class="pull-right" value="5"/></a></li>
        <li><a href="#">Completed Projects <Badge bg="green" class="pull-right" value="12"/></a></li>
        <li><a href="#">Followers <Badge bg="red" class="pull-right" value="842"/></a></li>
      </ul>
    </WidgetSocial2>
    <WidgetSocial md="4" title="Alexander Pierce" tagLine="Founder &amp; CEO" image="dist/img/user1-128x128.jpg" bg="aqua-active">
      <Row>
        <Col sm="4" class="border-right">
          <div class="description-block">
            <h5 class="description-header">3,200</h5>
            <span class="description-text">SALES</span>
          </div>
        </Col>
        <Col sm="4" class="border-right">
          <div class="description-block">
            <h5 class="description-header">13,000</h5>
            <span class="description-text">FOLLOWERS</span>
          </div>
        </Col>
        <Col sm="4">
          <div class="description-block">
            <h5 class="description-header">35</h5>
            <span class="description-text">PRODUCTS</span>
          </div>
        </Col>
      </Row>
    </WidgetSocial>
    <WidgetSocial md="4" title="Elizabeth Pierce" tagLine="Web Designer" image="dist/img/user3-128x128.jpg" bg="black" background="dist/img/photo1.png">
      <Row>
        <Col sm="4" class="border-right">
          <div class="description-block">
            <h5 class="description-header">3,200</h5>
            <span class="description-text">SALES</span>
          </div>
        </Col>
        <Col sm="4" class="border-right">
          <div class="description-block">
            <h5 class="description-header">13,000</h5>
            <span class="description-text">FOLLOWERS</span>
          </div>
        </Col>
        <Col sm="4">
          <div class="description-block">
            <h5 class="description-header">35</h5>
            <span class="description-text">PRODUCTS</span>
          </div>
        </Col>
      </Row>
    </WidgetSocial>
  </Row>)

const WidgetPosts = () => (
  <Row>
    <WidgetPost md="6"
      postBody={
        <PostBody likes="127">
          <Image class="img-responsive pad" src="dist/img/photo2.png" title="Photo"/>
          <p>I took this photo this morning. What do you guys think?</p>
        </PostBody>
      }
      postComments={
        <>
          <PostComment title="Maria Gonzales" timestamp="8:03 PM Today" image="dist/img/user3-128x128.jpg">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </PostComment>
          <PostComment title="Luna Stark" timestamp="8:03 PM Today" image="dist/img/user4-128x128.jpg">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </PostComment>
          <PostComment title="Nora Havisham" timestamp="8:03 PM Today" image="dist/img/user5-128x128.jpg">
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </PostComment>
        </>
      }/>
    <WidgetPost md="6"
      postBody={
        <PostBody likes="45">
          <p>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
            Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
            It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
          </p>
          <div class="attachment-block clearfix">
            <Image class="attachment-img" src="dist/img/photo1.png" alt="Attachment Image"/>
            <div class="attachment-pushed">
              <h4 class="attachment-heading"><a href="http://www.lipsum.com/">Lorem ipsum text generator</a></h4>
              <div class="attachment-text">
                Description about the attachment can be placed here. Lorem Ipsum is simply dummy text of the printing and typesetting industry... <a href="#">more</a>
              </div>
            </div>
          </div>
        </PostBody>
      }
      postComments={
        <>
          <PostComment title="Maria Gonzales" timestamp="8:03 PM Today" image="dist/img/user3-128x128.jpg">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </PostComment>
          <PostComment title="Nora Havisham" timestamp="8:03 PM Today" image="dist/img/user5-128x128.jpg">
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </PostComment>
        </>
      }/>
  </Row>)

class Page extends Component {
  title = 'Widgets'
  tagLine = 'Preview Page'
  componentDidMount()  { console.log(`componentDidMount (${this.title})`) }
  componentDidUpdate() { console.log(`componentDidUpdate (${this.title})`) }
  render() {
    return (
      <Layout title={this.title} tagLine={this.tagLine}>
        <BoxInfos/>
        <BoxInfosBg/>
        <BoxSmalls/>
        <BoxBehaviors/>
        <BoxBehaviorsSolid/>
        <BoxDirectChats/>
        <h2 class="page-header">Social Widgets</h2>
        <WidgetSocials/>
        <WidgetPosts/>
      </Layout>
    )
  }
}

export default Page
