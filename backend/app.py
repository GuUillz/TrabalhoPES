import sys
import os

# Adiciona o diretório atual ao path para os imports funcionarem
sys.path.append(os.getcwd())

from flask import Flask
from flask_cors import CORS

# Imports das Rotas
from routes.cliente_routes import cliente_bp
from routes.admin_routes import admin_bp

# Imports dos Catálogos para inicializar dados
from catalogos.CatFilme import CatFilme
from catalogos.CatSala import CatSala
from catalogos.CatAssento import CatAssento
from catalogos.CatSessao import CatSessao

app = Flask(__name__)
CORS(app) # Permite que o React acesse o Flask

# Registra as rotas com prefixos
app.register_blueprint(cliente_bp, url_prefix='/api/cliente')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

if __name__ == '__main__':
    print(">>> Inicializando Dados do Sistema...")
    
    # ORDEM DE INICIALIZAÇÃO É IMPORTANTE!
    CatSala.mock_data()         # 1. Cria Salas
    CatFilme.mock_data()        # 2. Cria Filmes (já com Genero/Classificacao)
    CatAssento.mock_data()      # 3. Cria Assentos
    CatSessao.mock_data()       # 4. Cria Sessões (precisa de Filme e Sala)
    
    print(">>> Servidor Rodando: http://localhost:5000")
    app.run(debug=True, port=5000)