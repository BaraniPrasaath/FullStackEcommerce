# api/documents.py
from django_elasticsearch_dsl import Document, Index, fields
from django_elasticsearch_dsl.registries import registry
from .models import Product, Category
from elasticsearch_dsl import analyzer

# Simple analyzer
lowercase_analyzer = analyzer(
    'lowercase_analyzer',
    tokenizer="standard",
    filter=["lowercase"]
)

products_index = Index('products')
products_index.settings(
    number_of_shards=1,
    number_of_replicas=0
)

@registry.register_document
class ProductDocument(Document):
    # embed category data from the ForeignKey relation
    ct = fields.ObjectField(properties={
        'ct_id': fields.IntegerField(),
        'ct_name': fields.TextField(analyzer=lowercase_analyzer),
        'ct_description': fields.TextField(analyzer=lowercase_analyzer),
    })

    pdt_id = fields.IntegerField()
    pdt_name = fields.TextField(analyzer=lowercase_analyzer)
    pdt_mrp = fields.FloatField()
    pdt_dis_price = fields.FloatField()
    pdt_qty = fields.IntegerField()

    class Index:
        name = 'products'
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0
        }

    class Django:
        model = Product
        fields = []

        # This ensures category data is included when indexing
        related_models = [Category]

    # Hook: When a Category changes, reindex related Products
    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, Category):
            return related_instance.products.all()



