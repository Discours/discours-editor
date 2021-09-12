import { get } from 'svelte/store'
import { lang } from '../stores/user'

const ru2en = {
    'Поделиться своей историей': 'Share your storу',
    'Поделиться': 'Share',
    'Отправить': 'Send'
}

export default (s) => (get(lang) === 'en') && ru2en[s] || s