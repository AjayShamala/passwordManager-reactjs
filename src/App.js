import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'
const colorList = ['skyblue', 'green', 'orange', 'pink', 'silver']
class App extends Component {
  state = {
    latestList: [],
    isTrue: false,
    website: '',
    username: '',
    password: '',
    isShow: true,
  }
  onClickWebsite = event => {
    this.setState({website: event.target.value})
  }
  onClickUsername = event => {
    this.setState({username: event.target.value})
  }
  onClickpassword = event => {
    this.setState({password: event.target.value})
  }
  onAddButton = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const passwordColors = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      username: username,
      password: password,
      colors: passwordColors,
    }
    this.setState(previous => ({
      latestList: [...previous.latestList, newValues],
      website: '',
      password: '',
      username: '',
      isTrue: true,
      searchInput: '',
    }))
  }
  onClickSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }
  onShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }
  onDeletepassword = id => {
    const {latestList} = this.state
    const filteredPassword = latestList.filter(each => each.id !== id)
    const userSearch = filteredPassword.length !== 0
    this.setState({latestList: filteredPassword, isTrue: userSearch})
  }
  render() {
    const {isShow, website, username, password, searchInput, latestList} =
      this.state
    let {isTrue} = this.state
    const filteredPassword = latestList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (filteredPassword.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="image"
        />
        <div className="card-container">
          <div className="container">
            <div className="card">
              <h1 className="main-heading">Add New Password</h1>
              <form className="form-container" onSubmit={this.onAddButton}>
                <div className="row-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="image-1"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    value={website}
                    onChange={this.onClickWebsite}
                    className="input-container"
                  />
                </div>
                <div className="row-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="image-1"
                  />
                  <input
                    type="type"
                    placeholder="Enter Username"
                    value={username}
                    onChange={this.onClickUsername}
                    className="input-container"
                  />
                </div>
                <div className="row-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="image-1"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onClickpassword}
                    className="input-container"
                  />
                </div>
                <div className="cons">
                  <button type="submit" className="button">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="no passwords"
              className="password-image"
            />
          </div>
        </div>
        <div className="search-container">
          <div className="pass">
            <div className="passed">
              <h1 className="head">Your Passwords</h1>
              <p className="para">{filteredPassword.length}</p>
            </div>
            <div className="search-bar">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="image-2"
              />
              <input
                type="search"
                className="input-containers"
                placeholder="Search"
                value={searchInput}
                onChange={this.onClickSearchInput}
              />
            </div>
          </div>
          <hr className="horiizontal-container" />
          <div className="end-container">
            <input
              type="checkbox"
              className="inputs"
              onChange={this.onShowPassword}
              id="checkBox"
            />
            <label className="label-container" htmlFor="checkBox">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="password manager"
                className="image-4"
              />
              <p className="paras">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="containerss">
              {filteredPassword.map(each => (
                <li className="list-container" key={each.id} id={each.id}>
                  <p className={`initials ${each.colors}`}>
                    {each.initialValue}
                  </p>
                  <div className="class-container">
                    <p className="parasss">{each.websiteName}</p>
                    <p className="parasss">{each.username}</p>

                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="star-image"
                      />
                    )}
                    {isShow && <p className="paragraph">{each.password}</p>}
                  </div>
                  <button
                    className="button-containers"
                    data-testid="delete"
                    onClick={() => this.onDeletepassword(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="delete-img"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
