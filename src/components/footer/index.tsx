import { Film, Github, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                CineReview
              </span>
            </div>
            <p className="text-muted-foreground">
              A plataforma definitiva para descobrir, avaliar e compartilhar
              opiniões sobre filmes e séries.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navegação</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Filmes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Séries
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Top Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Críticos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Lançamentos
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Gêneros</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Ação
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Comédia
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Ficção Científica
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terror
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Newsletter</h3>
            <p className="text-muted-foreground text-sm">
              Receba as últimas novidades e reviews diretamente no seu email.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Seu email"
                className="bg-muted/50"
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 CineReview. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Termos de Uso
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
