import { Film, Github, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavItem } from "../navbar/nav-item";

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navegação</h3>
            <ul className="space-y-2 text-muted-foreground">
              <NavItem href="#" text="Filmes" />
              <NavItem href="#" text="Séries" />
              <NavItem href="#" text="Top Reviews" />
              <NavItem href="#" text="Críticos" />
              <NavItem href="#" text="Lançamentos" />
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-muted-foreground">Gêneros</h3>
            <ul className="space-y-2 text-foreground">
              <NavItem href="#" text="Drama" />
              <NavItem href="#" text="Comédia" />
              <NavItem href="#" text="Ficção Científica" />
              <NavItem href="#" text="Ação" />
            </ul>
          </div>

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
            © 2025 CineReview. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <NavItem href="#" text="Termos de Uso" />
            <NavItem href="#" text="Política de Privacidade" />
            <NavItem href="#" text="Contato" />
          </div>
        </div>
      </div>
    </footer>
  );
}
