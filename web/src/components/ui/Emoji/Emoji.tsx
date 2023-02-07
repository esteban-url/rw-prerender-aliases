const Emoji = () => {
  const randomEmoji = () => {
    const emojis = ['👍', '👌', '👏', '🙌', '🤙', '🤘', '🤝', '👋']
    const randomIndex = Math.floor(Math.random() * emojis.length)
    return emojis[randomIndex]
  }

  return <span role="img">{randomEmoji()}</span>
}

export default Emoji
