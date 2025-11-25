from modelos.Ingresso.TipoIngresso import TipoIngresso
class CatTipoIngresso:
    _tipos = [
        TipoIngresso("inteira", "INTEIRA", 30.00),
        TipoIngresso("meia", "MEIA ENTRADA", 15.00),
        TipoIngresso("promo", "PROMOÇÃO SEMANAL", 10.00)
    ]
    @classmethod
    def get_tipo_ingresso(cls, id_tipo): return next((t for t in cls._tipos if t.id == id_tipo), None)
    @classmethod
    def get_all(cls): return cls._tipos