package go_models_user

type User struct {
	ID        string `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string `validate:"required,email,min=6,max=32" json:"email,omitempty" bson:"email,omitempty"`
	Username  string `validate:"required" json:"username" bson:"username"`
	FirstName string `validate:"required" json:"firstName" bson:"first_name,omitempty"`
	LastName  string `validate:"required" json:"lastName" bson:"last_name,omitempty"`
}
