/* eslint-disable prettier/prettier */
import { get } from 'svelte/store'
import { lang } from '../stores/user'

const ru2en = {
  'Поделиться своей историей': 'Share your storу',
  'Подписать обращение': 'Sign the petition',
  Поделиться: 'Share',
  Отправить: 'Send',
  недавно: 'recently',
  аноним: 'anonymous',
  'Ваше имя': 'Your name',
  'Ваша подпись': 'Your sign',
  'Ваше мнение': 'Your opinion',
  'Ваша история': 'Your story',
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export default (s: string): string => (get(lang) === 'en' && ru2en[s]) || s
