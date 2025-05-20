from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Load real models
score_model = joblib.load("models/score_svr_model.joblib")
corruption_model = joblib.load("models/PerceptionsOfCorruption_svr_model (2).joblib")

try:
    health_model = joblib.load("models/health_model.joblib")
except:
    health_model = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Features(BaseModel):
    target: str
    gdp_per_capita: float
    social_support: float
    healthy_life_expectancy: float
    freedom_to_make_life_choices: float
    generosity: float
    perceptions_of_corruption: float

@app.post("/predict")
def predict(features: Features):
    input_data = [
        features.gdp_per_capita,
        features.social_support,
        features.healthy_life_expectancy,
        features.freedom_to_make_life_choices,
        features.generosity,
        features.perceptions_of_corruption,
    ]

    if features.target == "happiness":
        model = score_model
    elif features.target == "corruption":
        model = corruption_model
    elif features.target == "health" and health_model is not None:
        model = health_model
    else:
        return {"error": "Invalid target variable or model not available"}

    prediction = model.predict([input_data])[0]
    return {"predicted_score": prediction}
