#version 330

in vec3 TextureCoords;

out vec4 out_colour;   


uniform samplerCube DayCubeMap;
uniform samplerCube NightCubeMap;
uniform float		BlendFactor ;
uniform vec3		FogColour ;

const float LowerLimit = 0.0;
const float UpperLimit = 0.2;

void main(void)
{
    vec4 texture1	  = texture(DayCubeMap, TextureCoords);
    vec4 texture2	  = texture(NightCubeMap, TextureCoords);
	vec4 final_colour = mix(texture2, texture1, BlendFactor);

    float factor	= (TextureCoords.y - LowerLimit)/(UpperLimit - LowerLimit );
    factor			= clamp(factor, 0.f, 1.f);
    final_colour	= mix(vec4(FogColour, 1.f), final_colour, factor);

	out_colour      = final_colour;
}