import '../assets/styles/footer.styl'

export default {
  data() {
    return {
      author: 'ccc',
      blog: 'ccc'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>
          Power by {this.author}
          {this.blog}
        </span>
      </div>
    )
  }
}
