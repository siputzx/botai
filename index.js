/*
 * Base Simpel
 * Created By Siputzx Production
 */

const {
  default: makeWASocket,
  DisconnectReason,
  makeInMemoryStore,
  jidDecode,
  proto,
  getContentType,
  useMultiFileAuthState,
  downloadContentFromMessage,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const axios = require('axios')
const readline = require('readline');
const PhoneNumber = require('awesome-phonenumber');

const store = makeInMemoryStore({
  logger: pino().child({ level: 'silent', stream: 'store' }),
});

const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(text, resolve);
  });
};

async function startBotz() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const ptz = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    emitOwnEvents: true,
    fireInitQueries: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
  });

  if (!ptz.authState.creds.registered) {
    const phoneNumber = await question(
      '𝙼𝚊𝚜𝚞𝚔𝚊𝚗 𝙽𝚘𝚖𝚎𝚛 𝚈𝚊𝚗𝚐 𝙰𝚔𝚝𝚒𝚏 𝙰𝚠𝚊𝚕𝚒 𝙳𝚎𝚗𝚐𝚊𝚗 𝟼𝟸 :\n',
    );
    let code = await ptz.requestPairingCode(phoneNumber);
    code = code?.match(/.{1,4}/g)?.join('-') || code;
    console.log(`𝙲𝙾𝙳𝙴 𝙿𝙰𝙸𝚁𝙸𝙽𝙶 :`, code);
  }

  store.bind(ptz.ev);

  ptz.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message =
        Object.keys(mek.message)[0] === 'ephemeralMessage'
          ? mek.message.ephemeralMessage.message
          : mek.message;
      if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
      if (!ptz.public && !mek.key.fromMe && chatUpdate.type === 'notify')
        return;
      if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
      m = smsg(ptz, mek, store);
      const { type, quotedMsg, mentioned, now, fromMe } = m;
      var body =
        m.mtype === 'conversation'
          ? m.message.conversation
          : m.mtype == 'imageMessage'
            ? m.message.imageMessage.caption
            : m.mtype == 'videoMessage'
              ? m.message.videoMessage.caption
              : m.mtype == 'extendedTextMessage'
                ? m.message.extendedTextMessage.text
                : m.mtype == 'buttonsResponseMessage'
                  ? m.message.buttonsResponseMessage.selectedButtonId
                  : m.mtype == 'listResponseMessage'
                    ? m.message.listResponseMessage.singleSelectReply
                        .selectedRowId
                    : m.mtype == 'templateButtonReplyMessage'
                      ? m.message.templateButtonReplyMessage.selectedId
                      : m.mtype === 'messageContextInfo'
                        ? m.message.buttonsResponseMessage?.selectedButtonId ||
                          m.message.listResponseMessage?.singleSelectReply
                            .selectedRowId ||
                          m.text
                        : '';
      var budy = typeof m.text == 'string' ? m.text : '';
      global.prefa = ['', '!', '.', ',', '🐤', '🗿'];
      global.d = new Date();
      global.calender = d.toLocaleDateString('id');
      const prefix = prefa
        ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)
          ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0]
          : ''
        : (prefa ?? global.prefix);
      const isCmd = body.startsWith(prefix);
      const command = isCmd
        ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase()
        : '';
      const args = body.trim().split(/ +/).slice(1);
      const text = (q = args.join(' '));
      const botNumber = await ptz.decodeJid(ptz.user.id);
      const senderNumber = sender.split('@')[0];
      const isBot = botNumber.includes(senderNumber);
      const quoted = (q = m.quoted ? m.quoted : m);
      const groupMetadata = m.isGroup
        ? await ptz.groupMetadata(m.chat).catch((e) => {})
        : '';
      const groupName = m.isGroup ? groupMetadata.subject : '';
      const participants = m.isGroup ? await groupMetadata.participants : '';
      const sender = m.key.fromMe
        ? ptz.user.id.split(':')[0] + '@s.whatsapp.net' || ptz.user.id
        : m.key.participant || m.key.remoteJid;
      const pushname = m.pushName || `${senderNumber}`;
      const isGroup = m.isGroup;
      const mime = (quoted.msg || quoted).mimetype || '';

      const reply = (teks) => {
        ptz.sendMessage(
          m.chat,
          {
            text: teks,
            contextInfo: { forwardingScore: 9999, isForwarded: true },
          },
          { quoted: m },
        );
      };
      const from = m.chat;

      setInterval(async() => {
        if (ptz.ai && ptz.ai[m.sender]) {
          const now = Date.now();
          const lastActive = ptz.ai[m.sender].lastactive;

          if (now - lastActive > 10 * 1000) {
            delete ptz.ai[m.sender];
            await reply(
              '[ ✓ ] AutoAI dinonaktifkan otomatis karena tidak digunakan selama 10 menit.',
            );
          }
        }
      }, 1000);

      if (command  && !isBot) {
        console.log(
          `${m.isGroup ? '\x1b[0;32mGC\x1b[1;32m-CMD' : '\x1b[1;32m MESSAGE'} \x1b[0m[ \x1b[1;37m${command} \x1b[0m] at \x1b[0;32m${calender}\x1b[0m\n› ${m.chat}\n› from; \x1b[0;37m${m.sender.split('@')[0]}\x1b[0m${m.pushName ? ', ' + m.pushName : ''}\n› in; \x1b[0;32m${m.isGroup ? groupName : 'PRIVATE MESSAGE'}\x1b[0m`,
        );
        ptz.readMessages([m.key]);
        ptz.sendPresenceUpdate('composing', from);
      }

      switch (command) {
        case 'autoai':
          ptz.ai = ptz.ai ? ptz.ai : {};
          if (!text)
            reply(`*Contoh:* .autoai *[on/off] [bard/duckduckgo/luminai]*`);

          if (text.startsWith('on')) {
            const aiChoice = args[1] ? args[1].toLowerCase() : 'luminai';
            if (!['bard', 'duckduckgo', 'luminai'].includes(aiChoice)) {
              return reply(
                'Pilih AI yang valid: *bard*, *duckduckgo*, atau *luminai*',
              );
            }
            let user = await generateRandomUserCode()
            ptz.ai[m.sender] = { aiChoice, user, lastactive: Date.now() };
            reply(`[ ✓ ] Berhasil mengaktifkan autoAI dengan ${aiChoice}. perlu di ingat chat sesi akan otomatis terhapus jika tidak digunakan selama 10 menit`);
          } else if (text === 'off') {
            delete ptz.ai[m.sender];
            reply('[ ✓ ] Berhasil menonaktifkan autoAI');
          }
          break;

        default:
          if (ptz.ai && ptz.ai[m.sender]) {
            const { aiChoice, user } = ptz.ai[m.sender];

            let response;
            if (/audio|video|image|sticker/.test(mime)) return;
            if (budy) {
              if (['bard', 'duckduckgo', 'luminai'].includes(aiChoice)) {
                switch (aiChoice) {
                  case 'bard':
                    response = (
                      await axios.post('https://luminai.my.id/v3', {
                        text: budy,
                        user,
                      })
                    ).data.result;
                    break;
                  case 'duckduckgo':
                    response = (
                      await axios.post('https://luminai.my.id/v2', {
                        text: budy,
                        userid: user,
                      })
                    ).data.reply.reply;
                    break;
                  case 'luminai':
                    response = (
                      await axios.post('https://luminai.my.id/', {
                        content: budy,
                        user,
                      })
                    ).data.result;
                    break;
                }
              } else {
                response =
                  'AI tidak tersedia! Pastikan AI yang dipilih benar atau sudah diaktifkan.';
              }                          
              await ptz.sendMessage(m.chat, { text: `${response}` });
              ptz.ai[m.sender].lastactive = Date.now();
              console.log(ptz.ai)
            }
          }
      }
    } catch (err) {
      console.log('\x1b[1;31m' + err + '\x1b[0m');
    }
  });

  // Setting
  ptz.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + '@' + decode.server) ||
        jid
      );
    } else return jid;
  };

  ptz.getName = (jid, withoutContact = false) => {
    id = ptz.decodeJid(jid);
    withoutContact = ptz.withoutContact || withoutContact;
    let v;
    if (id.endsWith('@g.us'))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = ptz.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber(
              'international',
            ),
        );
      });
    else
      v =
        id === '0@s.whatsapp.net'
          ? {
              id,
              name: 'WhatsApp',
            }
          : id === ptz.decodeJid(ptz.user.id)
            ? ptz.user
            : store.contacts[id] || {};
    return (
      (withoutContact ? '' : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber(
        'international',
      )
    );
  };

  ptz.public = true;

  ptz.serializeM = (m) => smsg(ptz, m, store);
  ptz.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (
        reason === DisconnectReason.badSession ||
        reason === DisconnectReason.connectionClosed ||
        reason === DisconnectReason.connectionLost ||
        reason === DisconnectReason.connectionReplaced ||
        reason === DisconnectReason.restartRequired ||
        reason === DisconnectReason.timedOut
      ) {
        startBotz();
      } else if (reason === DisconnectReason.loggedOut) {
      } else {
        ptz.end(`Unknown DisconnectReason: ${reason}|${connection}`);
      }
    } else if (connection === 'open') {
      console.log('[Connected] ' + JSON.stringify(ptz.user.id, null, 2));
    }
  });

  ptz.ev.on('creds.update', saveCreds);

  ptz.sendText = (jid, text, quoted = '', options) =>
    ptz.sendMessage(jid, { text: text, ...options }, { quoted });

  ptz.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, '')
      : mime.split('/')[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  };

  return ptz;
}

startBotz();

function smsg(ptz, m, store) {
  if (!m) return m;
  let M = proto.WebMessageInfo;
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith('@g.us');
    m.sender = ptz.decodeJid(
      (m.fromMe && ptz.user.id) ||
        m.participant ||
        m.key.participant ||
        m.chat ||
        '',
    );
    if (m.isGroup) m.participant = ptz.decodeJid(m.key.participant) || '';
  }
  if (m.message) {
    m.mtype = getContentType(m.message);
    m.msg =
      m.mtype == 'viewOnceMessage'
        ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
        : m.message[m.mtype];
    m.body =
      m.message.conversation ||
      m.msg.caption ||
      m.msg.text ||
      (m.mtype == 'listResponseMessage' &&
        m.msg.singleSelectReply.selectedRowId) ||
      (m.mtype == 'buttonsResponseMessage' && m.msg.selectedButtonId) ||
      (m.mtype == 'viewOnceMessage' && m.msg.caption) ||
      m.text;
    let quoted = (m.quoted = m.msg.contextInfo
      ? m.msg.contextInfo.quotedMessage
      : null);
    m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
    if (m.quoted) {
      let type = getContentType(quoted);
      m.quoted = m.quoted[type];
      if (['productMessage'].includes(type)) {
        type = getContentType(m.quoted);
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === 'string')
        m.quoted = {
          text: m.quoted,
        };
      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo.stanzaId;
      m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id
        ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16
        : false;
      m.quoted.sender = ptz.decodeJid(m.msg.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === ptz.decodeJid(ptz.user.id);
      m.quoted.text =
        m.quoted.text ||
        m.quoted.caption ||
        m.quoted.conversation ||
        m.quoted.contentText ||
        m.quoted.selectedDisplayText ||
        m.quoted.title ||
        '';
      m.quoted.mentionedJid = m.msg.contextInfo
        ? m.msg.contextInfo.mentionedJid
        : [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };
      let vM = (m.quoted.fakeObj = M.fromObject({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id,
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {}),
      }));
      m.quoted.delete = () =>
        ptz.sendMessage(m.quoted.chat, { delete: vM.key });
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
        ptz.copyNForward(jid, vM, forceForward, options);
      m.quoted.download = () => ptz.downloadMediaMessage(m.quoted);
    }
  }
  if (m.msg.url) m.download = () => ptz.downloadMediaMessage(m.msg);
  m.text =
    m.msg.text ||
    m.msg.caption ||
    m.message.conversation ||
    m.msg.contentText ||
    m.msg.selectedDisplayText ||
    m.msg.title ||
    '';
  m.reply = (text, chatId = m.chat, options = {}) =>
    Buffer.isBuffer(text)
      ? ptz.sendMedia(chatId, text, 'file', '', m, { ...options })
      : ptz.sendText(chatId, text, m, { ...options });
  m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));
  m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
    ptz.copyNForward(jid, m, forceForward, options);

  return m;
}

function generateRandomUserCode() {
    return new Promise((resolve) => {
        const prefix = 'user-';
        const dateBuffer = Buffer.from(Date.now().toString());
        const randomCode = dateBuffer.toString('hex').slice(-5);
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        const finalCode = `${prefix}${randomCode}${code}`;
        resolve(finalCode);
    });
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update ${__filename}`);
  delete require.cache[file];
  require(file);
});
