import type { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp'
import { Mail, Phone, Send, type LucideIcon } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { phoneHref, portfolio, whatsappHref } from '../config/portfolio'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { BrandIcon, SocialLinks } from '../components/ui/SocialLinks'

const endpoint =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || portfolio.contact.formEndpoint.trim()

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

function validate(values: FormState): FieldErrors {
  const errors: FieldErrors = {}
  if (!values.name.trim()) errors.name = 'Indiquez votre nom.'
  if (!values.email.trim()) {
    errors.email = 'Indiquez votre adresse e-mail.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Adresse e-mail invalide.'
  }
  if (!values.subject.trim()) errors.subject = 'Indiquez un objet.'
  if (!values.message.trim()) errors.message = 'Écrivez votre message.'
  else if (values.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères.'
  }
  return errors
}

function ContactGlyph({
  icon,
  brand,
}: {
  icon: LucideIcon | IconDefinition
  brand: boolean
}) {
  if (brand) {
    return (
      <span className="inline-flex text-[18px] leading-none">
        <BrandIcon icon={icon as IconDefinition} />
      </span>
    )
  }
  const Glyph = icon as LucideIcon
  return <Glyph size={18} aria-hidden />
}

export function Contact() {
  const [values, setValues] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const { contact } = portfolio
  const contactLinks: {
    href: string
    label: string
    external: boolean
    icon: LucideIcon | IconDefinition
    brand: boolean
  }[] = [
    {
      href: contact.email
        ? `mailto:${contact.email}?subject=${encodeURIComponent('Contact portfolio Kim Mass')}`
        : '',
      label: contact.email,
      icon: Mail,
      external: false,
      brand: false,
    },
    { href: phoneHref(contact.phone), label: contact.phone, icon: Phone, external: false, brand: false },
    { href: whatsappHref(contact.whatsapp), label: 'WhatsApp', icon: faWhatsapp, external: true, brand: true },
  ].filter((link) => link.href.trim())

  const recipient = contact.email.trim()
  const canSend = Boolean(endpoint || recipient)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!endpoint) {
      if (!recipient) return
      const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
      setStatus('success')
      setFeedback(
        'Votre messagerie s’est ouverte avec le message prérempli. Il ne reste qu’à l’envoyer depuis celle-ci.',
      )
      return
    }

    setStatus('loading')
    setFeedback('')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, _subject: `Portfolio : ${values.subject.trim()}` }),
      })
      if (!res.ok) throw new Error('HTTP error')
      setStatus('success')
      setFeedback('Message envoyé. Merci — je vous répondrai dès que possible.')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
      setFeedback('Échec de l\'envoi. Réessayez ou utilisez les liens directs ci-dessous.')
    }
  }

  const inputClass =
    'mt-2 w-full rounded-none border-0 border-b border-text/30 bg-transparent px-0 py-3 font-sans text-[17px] text-text placeholder:text-muted/70 focus:border-accent focus:outline-none'

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border py-24 sm:py-32">
      <div className="page-shell">
        <SectionHeading
          label="Contact"
          title="Une idée en tête ? Faisons-la avancer."
          description="Projet numérique, collaboration ou opportunité professionnelle : la conversation peut commencer ici."
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="max-w-sm font-serif text-2xl italic leading-snug text-text">
              Ouvert aux collaborations sérieuses et aux problèmes intéressants.
            </p>
            <SocialLinks className="mt-8" />
            <ul className="mt-6 space-y-4 font-sans text-[17px] font-medium empty:hidden">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-2.5 text-text hover:text-accent"
                  >
                    <ContactGlyph icon={link.icon} brand={link.brand} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[17px] text-muted">
              Basé à Kinshasa, disponible à distance.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <form
              onSubmit={onSubmit}
              className="rounded-[4px] bg-surface p-6 sm:p-10"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="contact-name" className="font-sans text-[15px] font-medium text-muted">
                    Nom
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    className={inputClass}
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name ? (
                    <p id="err-name" className="mt-1.5 font-sans text-[14px] text-danger">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="contact-email" className="font-sans text-[15px] font-medium text-muted">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email ? (
                    <p id="err-email" className="mt-1.5 font-sans text-[14px] text-danger">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-subject" className="font-sans text-[15px] font-medium text-muted">
                    Objet
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    className={inputClass}
                    value={values.subject}
                    onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'err-subject' : undefined}
                  />
                  {errors.subject ? (
                    <p id="err-subject" className="mt-1.5 font-sans text-[14px] text-danger">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="font-sans text-[15px] font-medium text-muted">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    className={inputClass}
                    value={values.message}
                    onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                  />
                  {errors.message ? (
                    <p id="err-message" className="mt-1.5 font-sans text-[14px] text-danger">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
              </div>

              {feedback ? (
                <p
                  className={`mt-5 text-[16px] ${status === 'success' ? 'text-success' : 'text-danger'}`}
                  role="status"
                >
                  {feedback}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="primary"
                className="mt-6"
                disabled={status === 'loading' || !canSend}
              >
                <Send size={16} aria-hidden />
                {status === 'loading' ? 'Envoi…' : 'Envoyer le message'}
              </Button>
              {!endpoint && recipient ? (
                <p className="mt-3 text-[15px] italic text-muted">
                  Le message s&apos;ouvrira dans votre messagerie, prêt à être envoyé à {recipient}.
                </p>
              ) : null}
              {!canSend ? (
                <p className="mt-3 text-[15px] italic text-muted">
                  L&apos;envoi direct sera bientôt disponible. Vous pouvez me contacter via mes réseaux.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
