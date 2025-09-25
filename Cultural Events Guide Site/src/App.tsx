import React, { useState, useEffect } from 'react'
import { Search, User, Calendar, MapPin, Clock, Heart, Star } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Label } from './components/ui/label'
import { Badge } from './components/ui/badge'
import { ImageWithFallback } from './components/figma/ImageWithFallback'

interface User {
  id: string
  name: string
  email: string
  isLowIncome: boolean
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
  price: string
  lowIncomePrice?: string
  featured: boolean
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLowIncomeRegisterOpen, setIsLowIncomeRegisterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('todos')

  // Mock events data
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Festival de Teatro Brasileiro',
      description: 'Uma celebração do teatro nacional com as melhores peças contemporâneas.',
      date: '15/10/2024',
      time: '20:00',
      location: 'Teatro Municipal de São Paulo',
      category: 'teatro',
      image: 'https://images.unsplash.com/photo-1641865846455-fe3f288c0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW8lMjBwYXVsbyUyMHRoZWF0ZXIlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NTg4MzQ5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 'R$ 60,00',
      lowIncomePrice: 'R$ 15,00',
      featured: true
    },
    {
      id: '2',
      title: 'Exposição: Arte Contemporânea Paulista',
      description: 'Mostra coletiva com artistas emergentes da cena cultural paulistana.',
      date: '20/10/2024',
      time: '14:00',
      location: 'Pinacoteca do Estado',
      category: 'exposicoes',
      image: 'https://images.unsplash.com/photo-1608434904164-c8447262aa0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW8lMjBwYXVsbyUyMG11c2V1bSUyMGFydCUyMGdhbGxlcnl8ZW58MXx8fHwxNzU4ODM0OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 'R$ 20,00',
      lowIncomePrice: 'Gratuito',
      featured: true
    },
    {
      id: '3',
      title: 'Show: MPB no Centro Cultural',
      description: 'Noite especial com grandes nomes da música popular brasileira.',
      date: '25/10/2024',
      time: '21:00',
      location: 'Centro Cultural São Paulo',
      category: 'musica',
      image: 'https://images.unsplash.com/photo-1658886522791-976d56a86cf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW8lMjBwYXVsbyUyMGNvbmNlcnQlMjBsaXZlJTIwbXVzaWN8ZW58MXx8fHwxNzU4ODM0OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 'R$ 40,00',
      lowIncomePrice: 'R$ 10,00',
      featured: true
    },
    {
      id: '4',
      title: 'Festival de Cinema Independente',
      description: 'Mostra de filmes brasileiros independentes com debates e oficinas.',
      date: '30/10/2024',
      time: '19:00',
      location: 'Cine Belas Artes',
      category: 'eventos',
      image: 'https://images.unsplash.com/photo-1733755673926-e056de692a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW8lMjBwYXVsbyUyMGN1bHR1cmUlMjB0aGVhdGVyJTIwbXVzaWN8ZW58MXx8fHwxNzU4ODM0OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 'R$ 25,00',
      lowIncomePrice: 'R$ 8,00',
      featured: false
    },
    {
      id: '5',
      title: 'Oficina de Dança Contemporânea',
      description: 'Aula aberta para iniciantes em dança contemporânea.',
      date: '05/11/2024',
      time: '15:00',
      location: 'Espaço das Artes',
      category: 'eventos',
      image: 'https://images.unsplash.com/photo-1733755673926-e056de692a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW8lMjBwYXVsbyUyMGN1bHR1cmUlMjB0aGVhdGVyJTIwbXVzaWN8ZW58MXx8fHwxNzU4ODM0OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 'R$ 30,00',
      lowIncomePrice: 'R$ 5,00',
      featured: false
    },
    {
      id: '6',
      title: 'Sarau Literário na Vila Madalena',
      description: 'Noite de poesia e literatura com autores locais.',
      date: '08/11/2024',
      time: '20:30',
      location: 'Livraria Cultura',
      category: 'eventos',
      image: 'https://images.unsplash.com/photo-1733755673926-e056de692a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW8lMjBwYXVsbyUyMGN1bHR1cmUlMjB0aGVhdGVyJTIwbXVzaWN8ZW58MXx8fHwxNzU4ODM0OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 'Gratuito',
      lowIncomePrice: 'Gratuito',
      featured: false
    }
  ])

  useEffect(() => {
    const savedUser = localStorage.getItem('culturasp_user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (email: string, password: string) => {
    // Simulated login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: 'Usuário de Teste',
      email: email,
      isLowIncome: false
    }
    setCurrentUser(mockUser)
    localStorage.setItem('culturasp_user', JSON.stringify(mockUser))
    setIsLoginOpen(false)
  }

  const handleRegister = (name: string, email: string, password: string, isLowIncome: boolean = false) => {
    // Simulated registration - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      isLowIncome
    }
    setCurrentUser(newUser)
    localStorage.setItem('culturasp_user', JSON.stringify(newUser))
    setIsRegisterOpen(false)
    setIsLowIncomeRegisterOpen(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('culturasp_user')
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'todos' || event.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featuredEvents = filteredEvents.filter(event => event.featured)
  const upcomingEvents = filteredEvents.filter(event => !event.featured)

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'exposicoes', label: 'Exposições' },
    { id: 'teatro', label: 'Teatro' },
    { id: 'musica', label: 'Música' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">Cultura SP</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-white text-gray-900"
                />
              </div>
              
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <span>Olá, {currentUser.name}</span>
                  {currentUser.isLowIncome && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Baixa Renda
                    </Badge>
                  )}
                  <Button variant="outline" onClick={handleLogout} className="text-red-600 border-white hover:bg-red-50">
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-red-600 border-white hover:bg-red-50">
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Entrar no Cultura SP</DialogTitle>
                      </DialogHeader>
                      <LoginForm onSubmit={handleLogin} />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-2 px-3 rounded transition-colors ${
                  activeCategory === category.id
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl text-gray-900 mb-4">
            Guia de Eventos Culturais na cidade de São Paulo
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Descubra os melhores eventos culturais da cidade. Teatro, música, exposições e muito mais.
            Cadastre-se para ter acesso a preços especiais e conteúdo exclusivo.
          </p>
          
          {!currentUser && (
            <div className="flex justify-center space-x-4">
              <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    Cadastre-se
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Conta no Cultura SP</DialogTitle>
                  </DialogHeader>
                  <RegisterForm onSubmit={(name, email, password) => handleRegister(name, email, password, false)} />
                </DialogContent>
              </Dialog>
              
              <Dialog open={isLowIncomeRegisterOpen} onOpenChange={setIsLowIncomeRegisterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Cadastro Baixa Renda
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cadastro para Pessoas de Baixa Renda</DialogTitle>
                  </DialogHeader>
                  <div className="mb-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Benefícios do cadastro para baixa renda:</strong>
                    </p>
                    <ul className="text-sm text-green-700 mt-2 space-y-1">
                      <li>• Descontos de até 75% em eventos</li>
                      <li>• Acesso a eventos gratuitos exclusivos</li>
                      <li>• Workshops e oficinas sem custo</li>
                    </ul>
                  </div>
                  <LowIncomeRegisterForm onSubmit={(name, email, password) => handleRegister(name, email, password, true)} />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl text-gray-900 mb-6">Eventos em Destaque</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map(event => (
                <EventCard key={event.id} event={event} user={currentUser} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        <section>
          <h3 className="text-2xl text-gray-900 mb-6">Próximos Eventos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} user={currentUser} />
            ))}
          </div>
        </section>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum evento encontrado para sua busca.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function LoginForm({ onSubmit }: { onSubmit: (email: string, password: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
        Entrar
      </Button>
    </form>
  )
}

function RegisterForm({ onSubmit }: { onSubmit: (name: string, email: string, password: string) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name, email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
        Criar Conta
      </Button>
    </form>
  )
}

function LowIncomeRegisterForm({ onSubmit }: { onSubmit: (name: string, email: string, password: string) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name, email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Necessário para validação do benefício
        </p>
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Criar Conta com Benefícios
      </Button>
    </form>
  )
}

function EventCard({ event, user }: { event: Event; user: User | null }) {
  const [isFavorited, setIsFavorited] = useState(false)

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const getPrice = () => {
    if (user?.isLowIncome && event.lowIncomePrice) {
      return event.lowIncomePrice
    }
    return event.price
  }

  const getPriceDisplay = () => {
    const price = getPrice()
    if (user?.isLowIncome && event.lowIncomePrice && event.lowIncomePrice !== event.price) {
      return (
        <div>
          <span className="line-through text-gray-400 text-sm">{event.price}</span>
          <span className="ml-2 text-green-600 font-semibold">{event.lowIncomePrice}</span>
        </div>
      )
    }
    return <span className="font-semibold">{price}</span>
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        {event.featured && (
          <Badge className="absolute top-2 left-2 bg-red-600">
            Destaque
          </Badge>
        )}
        {user && (
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg">{event.title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 text-sm mb-4">{event.description}</p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {event.date}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg">
            {getPriceDisplay()}
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}