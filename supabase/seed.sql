-- ============================================================
-- SEED · SOLO PLACEHOLDERS marcados (estado='borrador', "· DEMO")
-- NO son datos reales. Reemplazar desde /admin cuando lleguen.
-- ============================================================

insert into categorias (slug, nombre, descripcion, orden) values
  ('minimotos',  'Minimotos',  'Deportivas en miniatura.', 1),
  ('mini-quads', 'Mini Quads', 'Cuatro ruedas, diversión todoterreno.', 2),
  ('pit-bikes',  'Pit Bikes',  'Para circuito y campo.', 3),
  ('buggies',    'Buggies',    'Adrenalina sobre cuatro ruedas.', 4),
  ('electricas', 'Eléctricas', 'Cero ruido, cero humos.', 5),
  ('equipacion', 'Equipación', 'Cascos, protecciones y ropa cross.', 6),
  ('recambios',  'Recambios',  'Piezas para no parar.', 7),
  ('accesorios', 'Accesorios', 'Los extras que marcan la diferencia.', 8)
on conflict (slug) do nothing;

-- Ejemplos en estado 'borrador' (no visibles públicamente hasta publicar).
insert into productos (slug, nombre, categoria_id, tipo_energia, precio, estado, cilindrada_cc, velocidad_max, edad_min)
select 'minimoto-cross-49-demo', 'Minimoto Cross 49 · DEMO', c.id, 'gasolina', 399, 'borrador', 49, 50, 7
from categorias c where c.slug = 'minimotos'
on conflict (slug) do nothing;

insert into productos (slug, nombre, categoria_id, tipo_energia, precio, estado, potencia_w, velocidad_max, autonomia_km, edad_min)
select 'moto-elec-1000-demo', 'Moto Eléctrica 1000W · DEMO', c.id, 'electrica', 749, 'borrador', 1000, 40, 22, 10
from categorias c where c.slug = 'electricas'
on conflict (slug) do nothing;
