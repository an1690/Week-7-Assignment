let emoji_past = []
let emojis = ""

window.addEventListener('load', () => {
    let emojiPastDiv = document.getElementById('past');

    fetch('/past_emoji')
    .then(response => response.json())
    .then(data => {
        emoji_past = data.data
        let emojiString = ""

        for (let i = 0; i < emoji_past.length; i++){
            let emojiItem = emoji_past[i]
            let emojiContent = emojiItem.emoji
            emojiString = emojiString + emojiContent
        }

        emojis = emojiString

        let newEmojiP = document.createElement('p');
        newEmojiP.id = "emoji_text"
        newEmojiP.innerHTML = emojis;
        emojiPastDiv.appendChild(newEmojiP);
    })
    .catch(error => {
        console.log(error);
    })

    let input = document.getElementById('input');
    let submit = document.getElementById('submit');

    submit.addEventListener('click', () => {
        let inputValue = input.value

        let data = {
            "emoji": inputValue
        }

        let dataString = JSON.stringify(data)

        fetch('/new_emoji', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: dataString
        })
        .then(response => response.json())
        .then(data => {
            let content = data.content.emoji;
            emojis = emojis + content
            let emojiText = document.getElementById('emoji_text');
            emojiText.innerHTML = emojis
        })
        .catch(error => {
            console.log(error);
        });
    });
})