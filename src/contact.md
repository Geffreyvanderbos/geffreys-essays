---
layout: layouts/base.njk
title: Contact
permalink: /contact/
---

I'd love to chat with you about anything. We could meet up for coffee, have a video-call, or just banter on messaging apps.

Find me at the following:

## Fediverse (Mastodon-ish)
The Fediverse is a collection of connected social networks, such as [Mastodon](https://joinmastodon.org/) or Pixelfed, where different servers talk to each other instead of one company controlling everything. 

To follow me, simply copy my handle open your [Fediverse app](https://joinmastodon.org/apps), paste it into the search bar, and press the follow button.

<code class="select-all">@geffrey@id.geff.re</code> <button onclick="navigator.clipboard.writeText('geffrey@id.geff.re'); const btn=this; btn.innerHTML='(copied!)'; setTimeout(()=>btn.innerHTML='(copy)',2000);" style="background: transparent; color: hsl(48, 94%, 68%); border: none; padding: 4px; border-radius: 4px; cursor: pointer; font-size: 100%; font-family: inherit; font-weight: 400">(copy)</button>

## Signal
[Signal](https://signal.org/) is a messaging app that focuses on keeping our conversations private and secure. The service does not show advertisements, track our activity, or collect personal information, and it lets us use a username instead of a phone number to stay more anonymous.

**Message me on Signal: [@geffrey.01](https://signal.me/#eu/d0xsyTaUj-fOp_ycZ0tJmy3mHSljfhIZjTSie9jKsmn_fEGEEM1KAKMmw3jFqzuz)**

## Email
Although not my preferred method, you can also reach me by email on the following address. This is NOT encrypted email.

<code id="email" style="user-select: all; font-family: monospace; display: none;"></code>
<noscript>
  <code class="select-all">
    hey<span style="display:none;">honeypot</span>@<span style="display:none;">honeypot</span>notevenmydomain</span>geff.re
  </code>
</noscript>
<script>
  document.getElementById('email').textContent = ['hey','@','geff.re'].join('');
  document.getElementById('email').style.display = 'inline';
</script>

***

## Verification and Encryption
<p style="margin-bottom: 0;">GPG is an open‑source version of PGP. It uses a pair of encryption keys that work together:</p>

- Private key – only I keep it. I use it to create a digital signature that says “this message comes from me.” and to decrypt anything that is sent to me with my public key.
- Public key – I share it with everyone. Anyone can use it to check that the signature is real or to send me encrypted files/messages.

My [Public Key](https://keys.openpgp.org/vks/v1/by-fingerprint/F297CC9A280F234EF528B04CAB685C4F0FF2E5C2): <code class="select-all">https://keys.openpgp.org/vks/v1/by-fingerprint/F297CC9A280F234EF528B04CAB685C4F0FF2E5C2</code>

### Keyoxide
Keyoxide shows which online accounts belong to the same person. I sign each of my accounts (my domain, my Fediverse profile, Codeberg, etc.) with my private key and add these signed proofs to Keyoxide. When others view my Keyoxide page, they can see that those accounts are truly mine.

I don’t think anyone is impersonating me, but this extra proof gives me peace of mind.

**Find my profiles on [Keyoxide](https://keyoxide.org/hkp/F297CC9A280F234EF528B04CAB685C4F0FF2E5C2)**
